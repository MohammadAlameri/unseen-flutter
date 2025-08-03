// Chapter 11: Responsive Design and Adaptive UIs
export function getChapter11Content() {
  return {
    id: 11,
    partId: 2,
    title: "Responsive Design and Adaptive UIs",
    sections: [
      "Understanding Screen Sizes and Breakpoints",
      "Flexible Layouts with Flex and Expanded",
      "MediaQuery and LayoutBuilder",
      "Platform-Specific Adaptations"
    ],
    readTime: "35 min",
    content: `
# Chapter 11: Responsive Design and Adaptive UIs

Creating applications that work seamlessly across different screen sizes, orientations, and platforms is essential in today's multi-device world. Flutter provides powerful tools and patterns for building responsive and adaptive user interfaces that provide optimal user experiences regardless of the device.

## 11.1 Understanding Screen Sizes and Breakpoints

Responsive design in Flutter starts with understanding the various screen sizes and establishing breakpoints that define how your UI should adapt.

### Common Device Categories

\`\`\`dart
class ScreenSize {
  static const double mobile = 600;
  static const double tablet = 900;
  static const double desktop = 1200;
  
  static bool isMobile(BuildContext context) =>
      MediaQuery.of(context).size.width < mobile;
      
  static bool isTablet(BuildContext context) =>
      MediaQuery.of(context).size.width >= mobile &&
      MediaQuery.of(context).size.width < desktop;
      
  static bool isDesktop(BuildContext context) =>
      MediaQuery.of(context).size.width >= desktop;
}
\`\`\`

## 11.2 Flexible Layouts with Flex and Expanded

Flutter's Flex widgets (Row and Column) combined with Expanded and Flexible widgets provide the foundation for responsive layouts.

\`\`\`dart
class ResponsiveLayout extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          // Fixed header
          Container(
            height: 80,
            color: Colors.blue,
            child: Center(child: Text('Header')),
          ),
          // Flexible content area
          Expanded(
            child: Row(
              children: [
                // Sidebar (1/4 of width on desktop, hidden on mobile)
                if (ScreenSize.isDesktop(context))
                  Expanded(
                    flex: 1,
                    child: Container(
                      color: Colors.grey[200],
                      child: Center(child: Text('Sidebar')),
                    ),
                  ),
                // Main content (3/4 on desktop, full width on mobile)
                Expanded(
                  flex: ScreenSize.isDesktop(context) ? 3 : 1,
                  child: Container(
                    color: Colors.white,
                    child: Center(child: Text('Main Content')),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
\`\`\`

## 11.3 MediaQuery and LayoutBuilder

MediaQuery provides information about the device and screen, while LayoutBuilder gives you the constraints of the parent widget.

\`\`\`dart
class AdaptiveCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        if (constraints.maxWidth > 600) {
          // Wide layout - horizontal
          return Card(
            child: Row(
              children: [
                Expanded(flex: 1, child: _buildImage()),
                Expanded(flex: 2, child: _buildContent()),
              ],
            ),
          );
        } else {
          // Narrow layout - vertical
          return Card(
            child: Column(
              children: [
                _buildImage(),
                _buildContent(),
              ],
            ),
          );
        }
      },
    );
  }
  
  Widget _buildImage() => Container(
    height: 200,
    color: Colors.blue[100],
    child: Icon(Icons.image, size: 64),
  );
  
  Widget _buildContent() => Padding(
    padding: EdgeInsets.all(16),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Title', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
        SizedBox(height: 8),
        Text('Description text that adapts to the available space...'),
      ],
    ),
  );
}
\`\`\`

## 11.4 Platform-Specific Adaptations

Sometimes you need to adapt not just to screen size, but to platform conventions and capabilities.

\`\`\`dart
class PlatformAdaptiveButton extends StatelessWidget {
  final String text;
  final VoidCallback onPressed;
  
  const PlatformAdaptiveButton({
    required this.text,
    required this.onPressed,
  });
  
  @override
  Widget build(BuildContext context) {
    if (Theme.of(context).platform == TargetPlatform.iOS) {
      return CupertinoButton(
        onPressed: onPressed,
        child: Text(text),
      );
    } else {
      return ElevatedButton(
        onPressed: onPressed,
        child: Text(text),
      );
    }
  }
}
\`\`\`

Responsive design in Flutter is about creating flexible layouts that adapt gracefully to different screen sizes and orientations, while adaptive design focuses on platform-specific behaviors and conventions. By combining these approaches, you can create applications that feel native and polished on every device.
    `
  };
} 