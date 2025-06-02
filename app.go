package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"my-lite-youtube-music/types"
	"net/http"
	"os"
	"strings"

	"github.com/joho/godotenv"
	"github.com/kkdai/youtube/v2"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	// Load .env file
	if err := godotenv.Load(); err != nil {
		log.Printf("Warning: .env file not found")
	}
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func convertDuration(duration string) string {
	//PT4M13S -> 4:13
	duration = strings.Replace(duration, "PT", "", 1)
	duration = strings.Replace(duration, "H", ":", 1)
	duration = strings.Replace(duration, "M", ":", 1)
	duration = strings.Replace(duration, "S", "", 1)
	return duration
}

func (a *App) SearchMusic(query string) ([]types.Video, error) {
	apiKey := os.Getenv("YOUTUBE_API_KEY")
	if apiKey == "" {
		return nil, fmt.Errorf("YOUTUBE_API_KEY not found in environment")
	}

	query = strings.TrimSpace(query)
	query = strings.Replace(query, " ", "+", -1)
	url := fmt.Sprintf("https://www.googleapis.com/youtube/v3/search?part=snippet&q=%s&key=%s&type=video&maxResults=3", query, apiKey)

	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var ytResp types.YouTubeResponse
	if err := json.NewDecoder(resp.Body).Decode(&ytResp); err != nil {
		return nil, err
	}

	var videos []types.Video
	for _, item := range ytResp.Items {
		detailUrl := fmt.Sprintf("https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=%s&key=%s", item.ID.VideoId, apiKey)
		detailResp, err := http.Get(detailUrl)
		if err != nil {
			return nil, err
		}
		defer detailResp.Body.Close()

		var ytDetailResp types.YoutubeVideoDetailResponse
		if err := json.NewDecoder(detailResp.Body).Decode(&ytDetailResp); err != nil {
			return nil, err
		}

		video := types.Video{
			ID:        item.ID.VideoId,
			Title:     item.Snippet.Title,
			Thumbnail: item.Snippet.Thumbnails.Default.Url,
			Author:    item.Snippet.ChannelTitle,
			Views:     ytDetailResp.Items[0].Statistics.ViewCount,
			Duration:  convertDuration(ytDetailResp.Items[0].ContentDetails.Duration),
		}
		videos = append(videos, video)
	}

	return videos, nil
}

func (a *App) GetVideoAudioUrl(videoId string) (string, error) {
	fmt.Println("Getting video audio url for videoId: ", videoId)
	client := youtube.Client{}

	video, err := client.GetVideo(videoId)
	if err != nil {
		return "", errors.New("failed to get video")
	}

	for {
		format := video.Formats.WithAudioChannels()
		audio, err := client.GetStreamURL(video, &format[0])
		if err != nil {
			continue
		}

		data, _ := http.Get(audio)
		if data.StatusCode == 200 {
			return audio, nil
		}
	}
}
