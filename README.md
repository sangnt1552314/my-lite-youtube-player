# My Lite YouTube Music

A lightweight desktop application for YouTube Music built with Wails. This application provides a native desktop experience for YouTube Music with additional features and optimizations.

## Features

- Native desktop application for YouTube Music
- Lightweight and fast performance
- System tray integration
- Media key support
- Minimal resource usage
- Cross-platform support (macOS, Windows, Linux)

## Prerequisites

- Go 1.18 or later
- Node.js 14 or later
- npm or yarn
- Wails CLI (`go install github.com/wailsapp/wails/v2/cmd/wails@latest`)

## Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/my-lite-youtube-music.git
   cd my-lite-youtube-music
   ```

2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   cd ..
   ```

3. Start the development server:
   ```bash
   wails dev
   ```

This will run the application in development mode with hot reload support. You can access the dev tools at http://localhost:34115.

## Building for Production

To create a production build:

```bash
wails build
```

The built application will be available in the `build/bin` directory.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Wails](https://wails.io/) - The framework used for building the desktop application
- [YouTube Music](https://music.youtube.com/) - Music streaming service