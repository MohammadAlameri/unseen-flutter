// Book content data structure
export const bookData = {
  title: "The Unseen Flutter: A Deep Dive into Internals and Advanced Concepts",
  subtitle: "A comprehensive guide for experienced Flutter developers",
  
  parts: [
    {
      id: 1,
      title: "The Core Mechanics of Flutter",
      description: "Dive deep into Flutter's three trees, build process, and internal architecture",
      chapters: [
        {
          id: 1,
          title: "Beyond the Widget: Understanding Flutter's Three Trees",
          sections: [
            "The Widget Tree: Your UI Blueprint",
            "The Element Tree: The Mutable Bridge", 
            "The Render Tree: Painting Pixels on Screen",
            "The Dance of the Trees: How UI Updates Happen"
          ],
          readTime: "25 min",
          content: `
# Chapter 1: Beyond the Widget: Understanding Flutter's Three Trees

In Flutter, everything is a widget. This often-repeated mantra is fundamental to understanding Flutter's declarative UI paradigm. However, the \`Widget\` objects you write in your Dart code are merely blueprints. Behind the scenes, Flutter employs a sophisticated system involving three distinct but interconnected trees to efficiently render and update your application's user interface: the **Widget Tree**, the **Element Tree**, and the **Render Tree**.

## 1.1 The Widget Tree: Your UI Blueprint

The Widget Tree is the most familiar of the three trees to Flutter developers, as it directly corresponds to the declarative UI code written in Dart. Every visual and non-visual component in a Flutter application is, at its core, a \`Widget\`. From \`Text\` and \`Image\` to \`Column\` and \`GestureDetector\`, each \`Widget\` serves as a declarative description of a part of the user interface.

### Basic Widget Structure

\`\`\`dart
class MyWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Hello Flutter'),
        Container(
          child: Icon(Icons.star),
        ),
      ],
    );
  }
}
\`\`\`

### Key Characteristics of Widgets

- **Immutable**: Widget objects cannot be changed after creation
- **Lightweight**: Widgets are designed to be created and destroyed frequently
- **Declarative**: They describe what the UI should look like, not how to build it
- **Composable**: Widgets can be combined to create complex UI structures

It is crucial to understand that \`Widget\` objects in Flutter are **immutable**. This immutability is a cornerstone of Flutter's performance and predictability. Once a \`Widget\` object is created, its configuration (its properties) cannot be changed.

## 1.2 The Element Tree: The Mutable Bridge

While \`Widget\`s are the declarative blueprints of your UI, the \`Element\` tree is the mutable, concrete representation of your application's UI hierarchy. For every \`Widget\` in the Widget Tree, Flutter creates a corresponding \`Element\` in the Element Tree.

### Element Lifecycle

\`\`\`dart
class MyElement extends ComponentElement {
  MyElement(MyWidget widget) : super(widget);
  
  @override
  Widget build() {
    return (widget as MyWidget).build(this);
  }
  
  @override
  void update(MyWidget newWidget) {
    super.update(newWidget);
    // Handle widget updates
  }
}
\`\`\`

### Key Characteristics of Elements

- **Mutable**: Elements can be updated and modified
- **Persistent**: Elements are maintained across widget rebuilds
- **Stateful**: Elements can hold state and manage widget lifecycle
- **Bridge**: They connect widgets to render objects

Unlike \`Widget\`s, \`Element\`s are mutable and more persistent. They are the intermediaries between the immutable \`Widget\` configurations and the low-level \`RenderObject\`s that handle the actual rendering.

## 1.3 The Render Tree: Painting Pixels on Screen

The \`Render Tree\`, also known as the \`RenderObject\` tree, is the lowest-level tree in Flutter's UI rendering pipeline. While the Widget Tree describes the desired UI configuration and the Element Tree manages the UI hierarchy, the Render Tree is responsible for the actual layout, painting, and hit testing of the UI on the screen.

### RenderObject Structure

\`\`\`dart
class MyRenderObject extends RenderBox {
  @override
  void performLayout() {
    // Calculate size and position
    size = constraints.biggest;
  }
  
  @override
  void paint(PaintingContext context, Offset offset) {
    // Draw the actual pixels
    final canvas = context.canvas;
    canvas.drawRect(
      Rect.fromLTWH(offset.dx, offset.dy, size.width, size.height),
      Paint()..color = Colors.blue,
    );
  }
}
\`\`\`

### Key Characteristics of RenderObjects

- **Performance-Optimized**: Designed for fast rendering
- **Mutable**: Can be updated efficiently
- **Platform-Agnostic**: Work across different platforms
- **Low-Level**: Handle actual pixel rendering

\`RenderObject\`s are highly optimized for performance. They are designed to be efficient in terms of memory usage and rendering speed. Unlike \`Widget\`s, which are immutable and rebuilt frequently, \`RenderObject\`s are mutable and persistent.

## 1.4 The Dance of the Trees: How UI Updates Happen

The true power and efficiency of Flutter's rendering engine lie in the intricate dance between the Widget, Element, and Render trees during UI updates. This coordinated effort, often referred to as the **reconciliation process**, is what allows Flutter to achieve its impressive performance and smooth animations.

### The Reconciliation Process

1. **Widget Tree Changes**: When a \`StatefulWidget\`'s \`setState()\` method is called, or when a parent \`StatelessWidget\` rebuilds, a new \`Widget\` tree is generated.

2. **Element Tree Comparison**: Flutter compares the new \`Widget\` tree with the existing \`Element\` tree to determine what has changed.

3. **Render Tree Updates**: Only the necessary \`RenderObject\`s are updated, avoiding expensive full rebuilds.

### Performance Benefits

- **Efficient Updates**: Only changed parts are rebuilt
- **Smooth Animations**: Render objects can be animated directly
- **Memory Efficiency**: Widgets are lightweight and disposable
- **Predictable Behavior**: Immutable widgets ensure consistency

### Example: Counter Widget Update

\`\`\`dart
class CounterWidget extends StatefulWidget {
  @override
  _CounterWidgetState createState() => _CounterWidgetState();
}

class _CounterWidgetState extends State<CounterWidget> {
  int _count = 0;
  
  void _increment() {
    setState(() {
      _count++;
    });
  }
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Count: \$_count'),
        ElevatedButton(
          onPressed: _increment,
          child: Text('Increment'),
        ),
      ],
    );
  }
}
\`\`\`

When \`_increment()\` is called:

1. **Widget Tree**: A new \`Text\` widget is created with the updated count
2. **Element Tree**: The existing \`Text\` element is updated with the new widget
3. **Render Tree**: Only the text rendering is updated, not the entire UI

This three-tree architecture is what makes Flutter both powerful and performant, allowing developers to write declarative UI code while maintaining excellent runtime performance.
          `
        },
        {
          id: 2,
          title: "The Flutter Build Process: From Dart to Native",
          sections: [
            "Compilation Pipeline Overview",
            "Dart-to-Native Compilation",
            "Android Build Process and Gradle",
            "iOS Build Process and Xcode Integration"
          ],
          readTime: "30 min",
          content: `
# Chapter 2: The Flutter Build Process: From Dart to Native

Understanding how Flutter transforms your Dart code into native applications is crucial for optimizing build times, troubleshooting deployment issues, and making informed architectural decisions. This chapter will take you through the entire compilation pipeline, from your source code to the final native binaries that run on devices.

## 2.1 Compilation Pipeline Overview

Flutter's compilation process varies significantly between development and production builds, and between different target platforms. The framework employs different compilation strategies to optimize for development speed during debugging and runtime performance in production.

### Development vs Production Builds

**Development Builds (Debug Mode):**
- Use Just-In-Time (JIT) compilation
- Enable hot reload and hot restart
- Include debugging information and assertions
- Larger binary size but faster compilation

**Production Builds (Release Mode):**
- Use Ahead-Of-Time (AOT) compilation
- Optimized for performance and size
- No debugging overhead
- Smaller, faster binaries

### Build Configuration

\`\`\`dart
// Your Dart code
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Center(
          child: Text('Hello, Flutter!'),
        ),
      ),
    );
  }
}
\`\`\`

### The Compilation Stages

1. **Dart Source Analysis**: The Dart analyzer checks your code for syntax errors, type errors, and other issues
2. **Kernel Generation**: Dart code is compiled to Dart Kernel format (.dill files)
3. **Platform-Specific Compilation**: Kernel is compiled to native code for the target platform
4. **Linking and Packaging**: Native code is linked with Flutter engine and packaged

## 2.2 Dart-to-Native Compilation

Flutter's compilation process begins with your Dart source code and transforms it through several stages before producing native machine code.

### Kernel Generation Process

\`\`\`bash
# Kernel generation command
flutter build kernel --output=app.dill lib/main.dart
\`\`\`

### AOT Compilation Process

\`\`\`bash
# AOT compilation for Android
flutter build apk --release

# AOT compilation for iOS
flutter build ios --release
\`\`\`

### Compilation Optimizations

- **Tree Shaking**: Removes unused code
- **Dead Code Elimination**: Eliminates unreachable code
- **Constant Folding**: Evaluates constants at compile time
- **Inlining**: Optimizes function calls

## 2.3 Android Build Process and Gradle

The Android build process is orchestrated by Gradle, Android's official build system. Understanding this process is essential for customizing builds, managing dependencies, and troubleshooting build issues.

### Gradle Build Configuration

\`\`\`gradle
// android/app/build.gradle
android {
    compileSdkVersion 33
    
    defaultConfig {
        applicationId "com.example.myapp"
        minSdkVersion 21
        targetSdkVersion 33
        versionCode flutterVersionCode.toInteger()
        versionName flutterVersionName
    }
    
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            useProguard true
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}

dependencies {
    implementation "org.jetbrains.kotlin:kotlin-stdlib-jdk7:\$kotlin_version"
    implementation 'androidx.core:core-ktx:1.8.0'
}
\`\`\`

### The Android Build Pipeline

1. **Resource Processing**: Android resources (layouts, drawables, strings) are processed and compiled
2. **Dart Compilation**: Flutter Dart code is compiled to native ARM/x64 code
3. **Native Library Integration**: Flutter engine and your compiled Dart code are packaged as native libraries
4. **APK/AAB Generation**: Everything is packaged into an APK or Android App Bundle

### Build Commands

\`\`\`bash
# Debug build
flutter build apk --debug

# Release build
flutter build apk --release

# App bundle for Play Store
flutter build appbundle --release
\`\`\`

## 2.4 iOS Build Process and Xcode Integration

The iOS build process integrates with Xcode's build system and follows Apple's compilation pipeline while incorporating Flutter-specific steps.

### iOS Build Configuration

\`\`\`xml
<!-- ios/Runner/Info.plist -->
<key>CFBundleIdentifier</key>
<string>\$(PRODUCT_BUNDLE_IDENTIFIER)</string>
<key>CFBundleName</key>
<string>MyApp</string>
<key>CFBundleVersion</key>
<string>\$(FLUTTER_BUILD_NUMBER)</string>
<key>CFBundleShortVersionString</key>
<string>\$(FLUTTER_BUILD_NAME)</string>
\`\`\`

### The iOS Build Pipeline

1. **Xcode Project Generation**: Flutter generates or updates the Xcode project
2. **Dart AOT Compilation**: Dart code is compiled to native ARM64 code
3. **Framework Integration**: Flutter.framework is embedded in the iOS app
4. **Code Signing**: The app is signed with your development or distribution certificate
5. **IPA Generation**: The final iOS app package is created

### Build Commands

\`\`\`bash
# Debug build

flutter build ios --debug

# Release build
flutter build ios --release

# Archive for App Store
flutter build ios --release --no-codesign
\`\`\`

## 2.5 Build Optimization Strategies

### Performance Optimization

- **Parallel Compilation**: Use multiple CPU cores
- **Incremental Builds**: Only rebuild changed files
- **Caching**: Cache intermediate build artifacts
- **Dependency Management**: Optimize package dependencies

### Size Optimization

\`\`\`yaml
# pubspec.yaml optimizations
flutter:
  assets:
    - assets/images/
  fonts:
    - family: Roboto
      fonts:
        - asset: fonts/Roboto-Regular.ttf
        - asset: fonts/Roboto-Bold.ttf
          weight: 700
\`\`\`

### Build Time Optimization

\`\`\`bash
# Enable build caching
flutter build apk --release --build-cache

# Use specific target
flutter build apk --target=lib/main.dart

# Optimize for specific architecture
flutter build apk --target-platform android-arm64
\`\`\`

Understanding these build processes helps you optimize compilation times, troubleshoot platform-specific issues, and make informed decisions about app architecture and deployment strategies.
          `
        },
        {
          id: 3,
          title: "Mastering Flutter SDK Management",
          sections: [
            "The flutter Command-Line Interface",
            "FVM (Flutter Version Management)",
            "Channel Management and Updates",
            "Environment Setup and Configuration"
          ],
          readTime: "20 min",
          content: `
# Chapter 3: Mastering Flutter SDK Management

As a Flutter developer, you'll inevitably encounter scenarios where managing different versions of the Flutter SDK becomes crucial. Whether you're working on multiple projects with varying SDK requirements, testing new features from a pre-release channel, or collaborating within a team that needs consistent development environments, effective SDK management is paramount.

## 3.1 The flutter Command-Line Interface

The flutter command-line interface (CLI) is your primary tool for interacting with the Flutter SDK. It provides a comprehensive set of commands for creating, running, building, testing, and analyzing Flutter applications.

### Essential CLI Commands

\`\`\`bash
# Check Flutter installation and dependencies
flutter doctor

# Create a new Flutter project
flutter create my_app

# Run the app in debug mode
flutter run

# Build the app for release
flutter build apk --release

# Get packages
flutter pub get

# Run tests
flutter test

# Analyze code
flutter analyze
\`\`\`

### flutter doctor: Your Development Environment Health Check

One of the most frequently used and indispensable commands in the Flutter CLI is \`flutter doctor\`. This command performs a comprehensive health check of your development environment, verifying that all necessary tools and configurations for Flutter development are correctly installed and set up.

When you run \`flutter doctor\`, it checks for:
- **Flutter SDK installation and version**
- **Android toolchain (Android Studio, SDK components)**
- **Xcode (for iOS/macOS development)**
- **Chrome (for web development)**
- **Connected devices and emulators**
- **IDE plugins**

### flutter upgrade and Channel Management

Keeping your Flutter SDK up to date is crucial for accessing the latest features, performance improvements, and bug fixes. The \`flutter upgrade\` command is used to update your Flutter SDK to the latest version available on your currently selected channel.

Flutter organizes its releases into different channels:
- **stable**: Recommended for most developers and production applications
- **beta**: Provides earlier access to upcoming features
- **dev**: For developers who want to try the very latest features
- **master**: The bleeding edge of Flutter development

\`\`\`bash
# Switch to stable channel
flutter channel stable
flutter upgrade

# Switch to beta channel
flutter channel beta
flutter upgrade

# Check current channel
flutter --version
\`\`\`

## 3.2 FVM (Flutter Version Management): A Developer's Best Friend

FVM is a powerful command-line tool that simplifies the process of managing multiple Flutter SDK versions on a single machine. It allows you to:

- Install and manage multiple Flutter SDK versions
- Switch SDK versions per project
- Share SDK configurations with team members
- Test new SDK versions safely

### Installing and Configuring FVM

Installing FVM is straightforward:

\`\`\`bash
# Install FVM
dart pub global activate fvm

# Install specific Flutter SDK versions
fvm install stable
fvm install 3.16.9
fvm install beta

# List installed versions
fvm list
\`\`\`

### Per-Project SDK Versions

The core strength of FVM lies in its ability to assign a specific Flutter SDK version to individual projects:

\`\`\`bash
cd my_flutter_project
fvm use 3.16.9
\`\`\`

This command will create a \`.fvm\` directory within your project, containing a symlink to the specified Flutter SDK version from the FVM cache.

### FVM Configuration

\`\`\`yaml
# .fvmrc file
{
  "flutterSdkVersion": "3.16.9",
  "flavors": {}
}
\`\`\`

## 3.3 Channel Management and Updates

Regularly upgrading your Flutter SDK ensures that you benefit from the continuous improvements and optimizations made by the Flutter team. However, be mindful of potential breaking changes, especially when upgrading across major versions or switching to less stable channels.

### Channel Switching Strategy

\`\`\`bash
# Check available channels
flutter channel

# Switch to a specific channel
flutter channel stable
flutter upgrade

# Verify the switch
flutter --version
\`\`\`

### Version Pinning

For production applications, it's recommended to pin to a specific version:

\`\`\`yaml
# pubspec.yaml
environment:
  sdk: ">=3.0.0 <4.0.0"
  flutter: ">=3.16.0"
\`\`\`

## 3.4 Environment Setup and Configuration

### IDE Integration

**VS Code Configuration:**

\`\`\`json
// .vscode/settings.json
{
  "dart.flutterSdkPath": ".fvm/flutter_sdk",
  "search.exclude": {
    "**/.fvm": true
  },
  "files.watcherExclude": {
    "**/.fvm": true
  }
}
\`\`\`

**Android Studio Configuration:**

\`\`\`yaml
# .idea/workspace.xml
<component name="PropertiesComponent">
  <property name="flutter.sdk" value="\$PROJECT_DIR\$/.fvm/flutter_sdk" />
</component>
\`\`\`

### CI/CD Integration

\`\`\`yaml
# GitHub Actions example
name: Flutter CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: subosito/flutter-action@v2
        with:
          flutter-version: '3.16.9'
      - run: flutter pub get
      - run: flutter test
      - run: flutter build apk
\`\`\`

### Best Practices for SDK Management

1. **Use stable channel for production applications**
2. **Test new versions in isolated environments**
3. **Keep your team on the same SDK version**
4. **Document SDK requirements in your project**
5. **Use FVM for complex multi-project setups**

### Troubleshooting Common Issues

\`\`\`bash
# Clear Flutter cache
flutter clean

# Reset Flutter installation
flutter doctor --android-licenses

# Reinstall Flutter SDK
flutter upgrade --force

# Check for conflicts
flutter doctor -v
\`\`\`

By mastering Flutter SDK management, you'll be able to work efficiently across multiple projects, test new features safely, and ensure consistent development environments across your team.
          `
        },
        {
          id: 4,
          title: "Bridging the Native Divide: Platform Channels",
          sections: [
            "Introduction to Platform Channels",
            "MethodChannel: Invoking Native Code",
            "EventChannel: Receiving Native Events",
            "BasicMessageChannel: Bidirectional Communication"
          ],
          readTime: "35 min",
          content: `
# Chapter 4: Bridging the Native Divide: Platform Channels

One of Flutter's most compelling features is its ability to build beautiful, natively compiled applications from a single codebase. However, there are inevitably scenarios where your Flutter application needs to interact with platform-specific functionalities that are not directly exposed by the Flutter framework.

## 4.1 Introduction to Platform Channels

Platform Channels provide a robust and flexible mechanism for communication between your Dart code (running in the Flutter engine) and the native code (Java/Kotlin on Android, Swift/Objective-C on iOS) of the host platform.

### When to Use Platform Channels

While Flutter provides a rich set of widgets and plugins that cover many common use cases, there are specific scenarios where Platform Channels become indispensable:

- **Accessing Device-Specific Features:** When you need to interact with hardware features not directly exposed by Flutter
- **Integrating with Native SDKs:** If your application needs to leverage existing native SDKs or libraries
- **Utilizing Platform-Specific UI Components:** In rare cases, you might need to embed or interact with native UI components
- **Performance-Critical Operations:** For computationally intensive tasks that can be more efficiently executed in native code
- **Legacy Code Integration:** When migrating an existing native application to Flutter

### Message Passing Principles

The communication over Platform Channels adheres to a few fundamental principles:

- **Asynchronous Communication:** All communication is asynchronous
- **Serialization:** Data passed between Dart and native code must be serialized
- **Channels as Named Conduits:** Each Platform Channel is identified by a unique string name
- **Bidirectional Flow:** Communication can flow in both directions

## 4.2 MethodChannel: Invoking Native Code

MethodChannel is the most commonly used type of platform channel. It allows you to invoke named methods on the platform side (Android or iOS) from your Dart code and receive a result back.

### Implementing Method Channels in Dart

\`\`\`dart
import 'package:flutter/services.dart';

class BatteryService {
  static const MethodChannel _channel = MethodChannel('com.example.my_app/battery');

  Future<int?> getBatteryLevel() async {
    try {
      final int? batteryLevel = await _channel.invokeMethod('getBatteryLevel');
      return batteryLevel;
    } on PlatformException catch (e) {
      print("Failed to get battery level: '\${e.message}'.");
      return null;
    }
  }
}
\`\`\`

### Implementing Method Channels in Android (Kotlin)

\`\`\`kotlin
class MainActivity: FlutterActivity() {
  private val CHANNEL = "com.example.my_app/battery"

  override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
    super.configureFlutterEngine(flutterEngine)
    MethodChannel(flutterEngine.dartExecutor.binaryMessenger, CHANNEL).setMethodCallHandler {
      call, result ->
      if (call.method == "getBatteryLevel") {
        val batteryLevel = getBatteryLevel()
        if (batteryLevel != -1) {
          result.success(batteryLevel)
        } else {
          result.error("UNAVAILABLE", "Battery level not available.", null)
        }
      } else {
        result.notImplemented()
      }
    }
  }
}
\`\`\`

## 4.3 EventChannel: Receiving Native Events

EventChannel allows native code to send a stream of events to the Dart side. This is ideal for continuous data streams, such as sensor updates or location changes.

### Implementing EventChannel in Dart

\`\`\`dart
import 'package:flutter/services.dart';

class BatteryStatusService {
  static const EventChannel _eventChannel = EventChannel('com.example.my_app/battery_status');

  Stream<int> get batteryLevelStream {
    return _eventChannel.receiveBroadcastStream().map((dynamic event) => event as int);
  }
}
\`\`\`

## 4.4 BasicMessageChannel: Bidirectional Communication

BasicMessageChannel facilitates bidirectional, asynchronous communication of arbitrary messages between Flutter and the host platform, using a specified MessageCodec for serialization.

### Performance Considerations and Best Practices

While platform channels are powerful, their usage comes with performance implications. Each message passed between Dart and native code involves a context switch and serialization/deserialization overhead.

**Best Practices:**
1. **Minimize Channel Calls:** Avoid making frequent, small calls over platform channels
2. **Optimize Data Transfer:** Only send the necessary data
3. **Choose the Right Channel Type:** Use MethodChannel for one-off requests, EventChannel for streams
4. **Handle Errors Gracefully:** Implement robust error handling on both sides
5. **Run Native Code on Background Threads:** For long-running operations
6. **Unregister Listeners:** Always ensure that you unregister your native listeners
7. **Consider Existing Plugins:** Before implementing a custom platform channel, search for existing Flutter packages

By following these best practices, you can effectively leverage platform channels to extend your Flutter application's capabilities without compromising on performance or maintainability.
          `
        },
        {
          id: 5,
          title: "Deep Dive into State Management (Beyond the Basics)",
          sections: [
            "Provider and Riverpod: Advanced Usage Patterns",
            "BLoC/Cubit: Complex State Flows",
            "InheritedWidget and InheritedModel: Under the Hood",
            "State Management Best Practices"
          ],
          readTime: "40 min",
          content: `
# Chapter 5: Deep Dive into State Management (Beyond the Basics)

State management is a perennial topic in Flutter development, and for good reason. As applications grow in complexity, managing the data that drives your UI becomes increasingly challenging. While setState() is sufficient for simple, localized state changes, larger applications demand more robust and scalable solutions.

## 5.1 Provider and Riverpod: Advanced Usage Patterns

Provider has emerged as one of the most popular and widely adopted state management solutions in the Flutter ecosystem. Built on top of InheritedWidget, it simplifies dependency injection and state management.

### Provider Types

- **Provider<T>:** The most basic provider, used to provide a value that doesn't change over time
- **ChangeNotifierProvider<T extends ChangeNotifier>:** Used to provide a ChangeNotifier and automatically rebuild widgets
- **FutureProvider<T>:** Exposes the result of a Future
- **StreamProvider<T>:** Exposes the values emitted by a Stream
- **MultiProvider:** Allows you to combine multiple providers into a single widget

### Advanced Usage Patterns with Provider

**ProxyProvider:** This is a powerful provider that allows you to create a value that depends on other providers:

\`\`\`dart
MultiProvider(
  providers: [
    Provider<AuthService>(create: (_) => AuthService()),
    ProxyProvider<AuthService, UserRepository>(
      update: (_, authService, __) => UserRepository(authService: authService),
    ),
  ],
  child: MyApp(),
)
\`\`\`

**Selector:** While Consumer rebuilds its entire subtree when the listened provider changes, Selector allows for more granular control over rebuilds:

\`\`\`dart
Selector<MyModel, int>(
  selector: (_, myModel) => myModel.someValue,
  builder: (_, someValue, __) {
    return Text("Value: \$someValue");
  },
)
\`\`\`

### Riverpod: A Type-Safe and Testable Alternative

Riverpod is a complete rewrite of Provider, designed to address some of its shortcomings, particularly around compile-time safety and testability.

**Key advantages of Riverpod:**
- **Compile-time Safety:** Eliminates the possibility of listening to a non-existent provider
- **No BuildContext for Reading Providers:** You can read providers from anywhere
- **Auto-Dispose Providers:** Providers can automatically dispose of their state
- **Provider Scoping:** Providers can be overridden for specific subtrees
- **Family Modifiers:** Enables you to create providers that take parameters

## 5.2 BLoC/Cubit: Complex State Flows

BLoC (Business Logic Component) and its simpler counterpart, Cubit, are architectural patterns and state management solutions that emphasize the separation of concerns.

### BLoC: Event-Driven State Management

The BLoC pattern is based on reactive programming principles. It uses streams to handle all inputs (events) and outputs (states).

**Example BLoC (Counter):**

\`\`\`dart
// Events
abstract class CounterEvent {}
class Increment extends CounterEvent {}
class Decrement extends CounterEvent {}

// BLoC
class CounterBloc extends Bloc<CounterEvent, int> {
  CounterBloc() : super(0) {
    on<Increment>((event, emit) => emit(state + 1));
    on<Decrement>((event, emit) => emit(state - 1));
  }
}
\`\`\`

### Cubit: A Simpler Alternative

Cubit is a subset of the BLoC pattern that simplifies state management by removing the concept of events. Instead of dispatching events, Cubits expose methods that directly emit new states.

**Example Cubit (Counter):**

\`\`\`dart
class CounterCubit extends Cubit<int> {
  CounterCubit() : super(0);

  void increment() => emit(state + 1);
  void decrement() => emit(state - 1);
}
\`\`\`

## 5.3 InheritedWidget and InheritedModel: Under the Hood

At the foundation of many Flutter state management solutions, including Provider, lies the InheritedWidget. Understanding InheritedWidget is crucial for comprehending how data is efficiently passed down the widget tree.

### InheritedWidget: Efficient Data Propagation

InheritedWidget is a special type of widget that allows its children to efficiently access data from an ancestor widget. When an InheritedWidget rebuilds, it notifies its dependents.

**Key characteristics:**
- **Immutability:** An InheritedWidget itself is immutable
- **Efficiency:** It avoids prop drilling and ensures that only relevant widgets rebuild
- **updateShouldNotify:** This method determines whether dependents should be notified

### InheritedModel: Granular Rebuilds

InheritedModel is a specialized InheritedWidget that allows for even more granular control over which dependents rebuild. It introduces the concept of a generic type T that represents different aspects of the model.

## 5.4 State Management Best Practices

**Choosing the Right Solution:**
- **setState():** For simple, localized state changes
- **Provider:** For dependency injection and simple state management
- **Riverpod:** For type-safe, testable state management
- **BLoC/Cubit:** For complex state flows and business logic separation
- **InheritedWidget:** For custom state management solutions

**Performance Considerations:**
- Minimize unnecessary rebuilds
- Use const constructors where possible
- Implement proper dispose methods
- Consider using keys for list items
- Profile your app to identify performance bottlenecks

By understanding these advanced state management patterns, you'll be able to choose the right tool for the right job and build maintainable, testable, and performant Flutter applications.
          `
        },
        {
          id: 6,
          title: "Performance Optimization and Debugging",
          sections: [
            "Flutter Performance Profiling",
            "Memory Management and Leaks",
            "Rendering Optimization",
            "Debugging Techniques and Tools"
          ],
          readTime: "30 min",
          content: `
# Chapter 6: Performance Optimization and Debugging

Performance optimization is crucial for creating smooth, responsive Flutter applications. This chapter covers advanced techniques for profiling, optimizing, and debugging your Flutter apps to ensure they deliver the best possible user experience.

## 6.1 Flutter Performance Profiling

Flutter provides powerful tools for analyzing and optimizing your application's performance. Understanding how to use these tools effectively is essential for identifying and resolving performance bottlenecks.

### Flutter DevTools

Flutter DevTools is a suite of performance and debugging tools that help you analyze your app's performance:

- **Performance Overlay:** Shows real-time frame rendering information
- **Timeline View:** Displays frame-by-frame performance data
- **Memory View:** Tracks memory usage and identifies leaks
- **Network View:** Monitors network requests and responses

### Performance Metrics to Monitor

Key metrics to track for optimal performance:

- **Frame Rate:** Maintain 60 FPS for smooth animations
- **Memory Usage:** Monitor for memory leaks and excessive allocation
- **Build Time:** Optimize widget rebuilds and layout calculations
- **Network Performance:** Minimize API calls and optimize data transfer

## 6.2 Memory Management and Leaks

Memory leaks can significantly impact your app's performance and stability. Understanding how to identify and prevent memory leaks is essential.

### Common Memory Leak Sources

- **Unclosed Streams:** Always cancel stream subscriptions
- **Unremoved Listeners:** Remove event listeners in dispose methods
- **Circular References:** Avoid strong references between objects
- **Large Objects:** Be mindful of image caching and data storage

### Memory Leak Detection

\`\`\`dart
class MemoryLeakDetector {
  static final Map<String, int> _instanceCounts = {};
  
  static void trackInstance(String className) {
    if (kDebugMode) {
      _instanceCounts[className] = (_instanceCounts[className] ?? 0) + 1;
      print('Created \$className. Total: \${_instanceCounts[className]}');
    }
  }
  
  static void untrackInstance(String className) {
    if (kDebugMode) {
      _instanceCounts[className] = (_instanceCounts[className] ?? 1) - 1;
      print('Disposed \$className. Remaining: \${_instanceCounts[className]}');
    }
  }
}
\`\`\`

## 6.3 Rendering Optimization

Optimizing the rendering pipeline is crucial for maintaining smooth animations and responsive UI.

### Widget Rebuild Optimization

- **Use const constructors** where possible
- **Implement proper keys** for list items
- **Minimize rebuild scope** with Selector and Consumer
- **Avoid expensive operations** in build methods

### Layout Optimization

\`\`\`dart
// Optimized ListView with fixed item height
ListView.builder(
  itemExtent: 80.0, // Fixed height improves scroll performance
  itemCount: items.length,
  itemBuilder: (context, index) {
    return ListTile(
      title: Text(items[index].name),
      subtitle: Text(items[index].description),
    );
  },
)
\`\`\`

## 6.4 Debugging Techniques and Tools

Effective debugging is essential for identifying and resolving issues quickly.

### Debugging Best Practices

1. **Use meaningful error messages**
2. **Implement proper logging**
3. **Use breakpoints strategically**
4. **Profile performance regularly**
5. **Test on real devices**

### Custom Debug Utilities

\`\`\`dart
class DebugUtils {
  static void logWidgetBuild(String widgetName) {
    if (kDebugMode) {
      print('Building \$widgetName at \${DateTime.now()}');
    }
  }
  
  static void measurePerformance(String operation, Function() function) {
    if (kDebugMode) {
      final stopwatch = Stopwatch()..start();
      function();
      stopwatch.stop();
      print('\$operation took \${stopwatch.elapsedMilliseconds}ms');
    } else {
      function();
    }
  }
}
\`\`\`

By mastering these performance optimization and debugging techniques, you'll be able to create high-performance Flutter applications that provide excellent user experiences.
          `
        },
        {
          id: 7,
          title: "Testing Strategies for Robust Flutter Apps",
          sections: [
            "Unit Testing in Flutter",
            "Widget Testing",
            "Integration Testing",
            "Test-Driven Development"
          ],
          readTime: "35 min",
          content: `
# Chapter 7: Testing Strategies for Robust Flutter Apps

Testing is a critical aspect of building reliable and maintainable Flutter applications. This chapter covers comprehensive testing strategies, from unit tests to integration tests, ensuring your app works correctly across different scenarios.

## 7.1 Unit Testing in Flutter

Unit tests verify that individual functions, methods, or classes work correctly in isolation. They are the foundation of a robust testing strategy.

### Setting Up Unit Tests

\`\`\`dart
import 'package:flutter_test/flutter_test.dart';
import 'package:my_app/services/calculator.dart';

void main() {
  group('Calculator', () {
    late Calculator calculator;
    
    setUp(() {
      calculator = Calculator();
    });
    
    test('should add two numbers correctly', () {
      expect(calculator.add(2, 3), equals(5));
    });
    
    test('should subtract two numbers correctly', () {
      expect(calculator.subtract(5, 3), equals(2));
    });
  });
}
\`\`\`

### Testing Business Logic

\`\`\`dart
class UserService {
  Future<User> getUser(String id) async {
    // Implementation
  }
  
  Future<List<User>> getUsers() async {
    // Implementation
  }
}

// Test
void main() {
  group('UserService', () {
    late UserService userService;
    late MockApiClient mockApiClient;
    
    setUp(() {
      mockApiClient = MockApiClient();
      userService = UserService(apiClient: mockApiClient);
    });
    
    test('should return user when API call succeeds', () async {
      // Arrange
      final user = User(id: '1', name: 'John Doe');
      when(mockApiClient.getUser('1')).thenAnswer((_) async => user);
      
      // Act
      final result = await userService.getUser('1');
      
      // Assert
      expect(result, equals(user));
    });
  });
}
\`\`\`

## 7.2 Widget Testing

Widget tests verify that your widgets render correctly and respond to user interactions as expected.

### Basic Widget Test

\`\`\`dart
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:my_app/widgets/counter_widget.dart';

void main() {
  group('CounterWidget', () {
    testWidgets('should display counter and increment button', (WidgetTester tester) async {
      // Arrange
      await tester.pumpWidget(MaterialApp(home: CounterWidget()));
      
      // Assert
      expect(find.text('0'), findsOneWidget);
      expect(find.byIcon(Icons.add), findsOneWidget);
    });
    
    testWidgets('should increment counter when button is pressed', (WidgetTester tester) async {
      // Arrange
      await tester.pumpWidget(MaterialApp(home: CounterWidget()));
      
      // Act
      await tester.tap(find.byIcon(Icons.add));
      await tester.pump();
      
      // Assert
      expect(find.text('1'), findsOneWidget);
    });
  });
}
\`\`\`

### Testing Complex Widgets

\`\`\`dart
testWidgets('should show loading state while fetching data', (WidgetTester tester) async {
  // Arrange
  final mockRepository = MockUserRepository();
  when(mockRepository.getUsers()).thenAnswer((_) async {
    await Future.delayed(Duration(seconds: 1));
    return [User(id: '1', name: 'John')];
  });
  
  // Act
  await tester.pumpWidget(
    MaterialApp(
      home: UserListWidget(repository: mockRepository),
    ),
  );
  
  // Assert
  expect(find.byType(CircularProgressIndicator), findsOneWidget);
  
  // Wait for data to load
  await tester.pump(Duration(seconds: 1));
  await tester.pump();
  
  expect(find.text('John'), findsOneWidget);
});
\`\`\`

## 7.3 Integration Testing

Integration tests verify that your app works correctly as a whole, testing the interaction between different parts of your application.

### Setting Up Integration Tests

\`\`\`dart
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';
import 'package:my_app/main.dart' as app;

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();
  
  group('App Integration Tests', () {
    testWidgets('should navigate through app successfully', (WidgetTester tester) async {
      // Arrange
      app.main();
      await tester.pumpAndSettle();
      
      // Act & Assert
      expect(find.text('Welcome'), findsOneWidget);
      
      // Navigate to settings
      await tester.tap(find.byIcon(Icons.settings));
      await tester.pumpAndSettle();
      
      expect(find.text('Settings'), findsOneWidget);
    });
  });
}
\`\`\`

## 7.4 Test-Driven Development

Test-Driven Development (TDD) is a development methodology where you write tests before implementing features.

### TDD Cycle

1. **Red:** Write a failing test
2. **Green:** Write the minimum code to make the test pass
3. **Refactor:** Improve the code while keeping tests green

### Example TDD Workflow

\`\`\`dart
// Step 1: Write failing test
test('should validate email format', () {
  final validator = EmailValidator();
  
  expect(validator.isValid('test@example.com'), isTrue);
  expect(validator.isValid('invalid-email'), isFalse);
});

// Step 2: Implement minimum code
class EmailValidator {
  bool isValid(String email) {
    return email.contains('@') && email.contains('.');
  }
}

// Step 3: Refactor with better implementation
class EmailValidator {
  static final RegExp _emailRegex = RegExp(
    r'^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[a-zA-Z]+',
  );
  
  bool isValid(String email) {
    return _emailRegex.hasMatch(email);
  }
}
\`\`\`

### Testing Best Practices

1. **Write tests for edge cases**
2. **Use descriptive test names**
3. **Keep tests independent**
4. **Mock external dependencies**
5. **Test error scenarios**
6. **Maintain test coverage**

By implementing comprehensive testing strategies, you'll build more reliable and maintainable Flutter applications that you can confidently deploy to users.
          `
        },
        {
          id: 8,
          title: "Flutter for Web and Desktop",
          sections: [
            "Web Development with Flutter",
            "Desktop Application Development",
            "Platform-Specific Optimizations",
            "Deployment Strategies"
          ],
          readTime: "25 min",
          content: `
# Chapter 8: Flutter for Web and Desktop

Flutter's versatility extends beyond mobile development to web and desktop platforms. This chapter explores how to leverage Flutter's cross-platform capabilities to build applications for web browsers and desktop operating systems.

## 8.1 Web Development with Flutter

Flutter web allows you to build interactive web applications using the same codebase as your mobile app, providing a consistent experience across platforms.

### Web-Specific Considerations

When developing for web, consider these platform-specific factors:

- **Performance:** Web apps have different performance characteristics than mobile apps
- **Responsive Design:** Ensure your UI adapts to various screen sizes
- **Browser Compatibility:** Test across different browsers and versions
- **SEO:** Implement proper meta tags and structured data

### Web Optimization Techniques

\`\`\`dart
// Responsive web layout
class ResponsiveWebLayout extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        if (constraints.maxWidth > 1200) {
          return DesktopLayout();
        } else if (constraints.maxWidth > 600) {
          return TabletLayout();
        } else {
          return MobileLayout();
        }
      },
    );
  }
}

// Web-specific navigation
class WebNavigation extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        TextButton(
          onPressed: () => Navigator.pushNamed(context, '/home'),
          child: Text('Home'),
        ),
        TextButton(
          onPressed: () => Navigator.pushNamed(context, '/about'),
          child: Text('About'),
        ),
      ],
    );
  }
}
\`\`\`

### Web Deployment

Deploying Flutter web apps involves building the app and serving the static files:

\`\`\`bash
# Build for web
flutter build web

# Serve locally for testing
flutter run -d chrome

# Deploy to hosting service
# Copy build/web directory to your web server
\`\`\`

## 8.2 Desktop Application Development

Flutter desktop support enables you to create native desktop applications for Windows, macOS, and Linux.

### Desktop-Specific Features

- **Native Window Management:** Control window size, position, and behavior
- **System Integration:** Access file system, clipboard, and system dialogs
- **Platform Channels:** Use platform-specific APIs when needed
- **Performance:** Leverage desktop hardware capabilities

### Desktop UI Patterns

\`\`\`dart
// Desktop-specific menu
class DesktopMenu extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MenuBar(
      children: [
        SubmenuButton(
          menuChildren: [
            MenuItemButton(
              onPressed: () => _newFile(),
              child: Text('New File'),
            ),
            MenuItemButton(
              onPressed: () => _openFile(),
              child: Text('Open File'),
            ),
          ],
          child: Text('File'),
        ),
        SubmenuButton(
          menuChildren: [
            MenuItemButton(
              onPressed: () => _showPreferences(),
              child: Text('Preferences'),
            ),
          ],
          child: Text('Edit'),
        ),
      ],
    );
  }
}

// Desktop window configuration
class DesktopApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('Desktop App'),
          actions: [
            IconButton(
              icon: Icon(Icons.minimize),
              onPressed: () => _minimizeWindow(),
            ),
            IconButton(
              icon: Icon(Icons.close),
              onPressed: () => _closeWindow(),
            ),
          ],
        ),
        body: DesktopContent(),
      ),
    );
  }
}
\`\`\`

## 8.3 Platform-Specific Optimizations

Each platform has unique characteristics that require specific optimizations.

### Web Optimizations

- **Code Splitting:** Load only necessary code for each route
- **Image Optimization:** Use appropriate image formats and sizes
- **Caching:** Implement proper caching strategies
- **Bundle Size:** Minimize JavaScript bundle size

### Desktop Optimizations

- **Window Management:** Optimize for different screen sizes and resolutions
- **Performance:** Leverage multi-threading for heavy computations
- **Accessibility:** Implement proper keyboard navigation and screen reader support
- **Security:** Follow platform security guidelines

## 8.4 Deployment Strategies

### Web Deployment Options

1. **Static Hosting:** GitHub Pages, Netlify, Vercel
2. **Cloud Platforms:** Firebase Hosting, AWS S3
3. **Traditional Web Servers:** Apache, Nginx

### Desktop Deployment

1. **Windows:** MSI installers, Windows Store
2. **macOS:** DMG files, Mac App Store
3. **Linux:** AppImage, Snap packages, traditional packages

### Continuous Deployment

\`\`\`yaml
# GitHub Actions example
name: Deploy Flutter Web
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: subosito/flutter-action@v2
        with:
          flutter-version: '3.16.9'
      - run: flutter build web
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: \${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build/web
\`\`\`

By mastering Flutter's web and desktop capabilities, you can create truly cross-platform applications that provide native experiences on every platform.
          `
        },
        {
          id: 9,
          title: "Advanced Animation and Custom Painting",
          sections: [
            "Custom Animations with AnimationController",
            "Custom Painting with CustomPainter",
            "Complex Animation Sequences",
            "Performance Optimization for Animations"
          ],
          readTime: "30 min",
          content: `
# Chapter 9: Advanced Animation and Custom Painting

Flutter's animation system is powerful and flexible, allowing you to create sophisticated animations and custom painted graphics. This chapter explores advanced animation techniques and custom painting capabilities.

## 9.1 Custom Animations with AnimationController

AnimationController provides fine-grained control over animations, allowing you to create complex animation sequences and custom timing curves.

### Basic AnimationController Setup

\`\`\`dart
class AnimatedWidget extends StatefulWidget {
  @override
  _AnimatedWidgetState createState() => _AnimatedWidgetState();
}

class _AnimatedWidgetState extends State<AnimatedWidget>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: Duration(seconds: 2),
      vsync: this,
    );
    _animation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _controller,
      curve: Curves.easeInOut,
    ));
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _animation,
      builder: (context, child) {
        return Transform.scale(
          scale: _animation.value,
          child: Container(
            width: 100,
            height: 100,
            color: Colors.blue,
          ),
        );
      },
    );
  }
}
\`\`\`

### Complex Animation Sequences

\`\`\`dart
class ComplexAnimation extends StatefulWidget {
  @override
  _ComplexAnimationState createState() => _ComplexAnimationState();
}

class _ComplexAnimationState extends State<ComplexAnimation>
    with TickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _scaleAnimation;
  late Animation<double> _rotationAnimation;
  late Animation<Color?> _colorAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: Duration(seconds: 3),
      vsync: this,
    );

    _scaleAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _controller,
      curve: Interval(0.0, 0.5, curve: Curves.easeOut),
    ));

    _rotationAnimation = Tween<double>(
      begin: 0.0,
      end: 2 * pi,
    ).animate(CurvedAnimation(
      parent: _controller,
      curve: Interval(0.2, 0.8, curve: Curves.easeInOut),
    ));

    _colorAnimation = ColorTween(
      begin: Colors.red,
      end: Colors.blue,
    ).animate(CurvedAnimation(
      parent: _controller,
      curve: Interval(0.5, 1.0, curve: Curves.easeIn),
    ));
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        return Transform.scale(
          scale: _scaleAnimation.value,
          child: Transform.rotate(
            angle: _rotationAnimation.value,
            child: Container(
              width: 100,
              height: 100,
              decoration: BoxDecoration(
                color: _colorAnimation.value,
                borderRadius: BorderRadius.circular(50),
              ),
            ),
          ),
        );
      },
    );
  }
}
\`\`\`

## 9.2 Custom Painting with CustomPainter

CustomPainter allows you to create custom graphics and complex visual effects by drawing directly on a canvas.

### Basic CustomPainter

\`\`\`dart
class CustomCirclePainter extends CustomPainter {
  final Color color;
  final double radius;

  CustomCirclePainter({
    required this.color,
    required this.radius,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = color
      ..style = PaintingStyle.fill;

    canvas.drawCircle(
      Offset(size.width / 2, size.height / 2),
      radius,
      paint,
    );
  }

  @override
  bool shouldRepaint(CustomCirclePainter oldDelegate) {
    return oldDelegate.color != color || oldDelegate.radius != radius;
  }
}

// Usage
Container(
  width: 200,
  height: 200,
  child: CustomPaint(
    painter: CustomCirclePainter(
      color: Colors.blue,
      radius: 50,
    ),
  ),
)
\`\`\`

### Complex Custom Painting

\`\`\`dart
class WavePainter extends CustomPainter {
  final double animationValue;

  WavePainter(this.animationValue);

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = Colors.blue.withOpacity(0.6)
      ..style = PaintingStyle.fill;

    final path = Path();
    path.moveTo(0, size.height);

    for (double x = 0; x <= size.width; x++) {
      final y = size.height * 0.5 +
          sin((x / size.width * 2 * pi) + (animationValue * 2 * pi)) * 20;
      path.lineTo(x, y);
    }

    path.lineTo(size.width, size.height);
    path.close();

    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(WavePainter oldDelegate) {
    return oldDelegate.animationValue != animationValue;
  }
}
\`\`\`

## 9.3 Complex Animation Sequences

Creating sophisticated animation sequences involves coordinating multiple animations and managing their timing.

### Staggered Animations

\`\`\`dart
class StaggeredAnimation extends StatefulWidget {
  @override
  _StaggeredAnimationState createState() => _StaggeredAnimationState();
}

class _StaggeredAnimationState extends State<StaggeredAnimation>
    with TickerProviderStateMixin {
  late List<AnimationController> _controllers;
  late List<Animation<double>> _animations;

  @override
  void initState() {
    super.initState();
    _controllers = List.generate(
      5,
      (index) => AnimationController(
        duration: Duration(milliseconds: 600),
        vsync: this,
      ),
    );

    _animations = _controllers.map((controller) {
      return Tween<double>(
        begin: 0.0,
        end: 1.0,
      ).animate(CurvedAnimation(
        parent: controller,
        curve: Curves.easeOutBack,
      ));
    }).toList();

    // Stagger the animations
    for (int i = 0; i < _controllers.length; i++) {
      Future.delayed(Duration(milliseconds: i * 100), () {
        if (mounted) _controllers[i].forward();
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: List.generate(5, (index) {
        return AnimatedBuilder(
          animation: _animations[index],
          builder: (context, child) {
            return Transform.translate(
              offset: Offset(0, 50 * (1 - _animations[index].value)),
              child: Opacity(
                opacity: _animations[index].value,
                child: Container(
                  width: 200,
                  height: 40,
                  margin: EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    color: Colors.blue,
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
              ),
            );
          },
        );
      }),
    );
  }

  @override
  void dispose() {
    for (var controller in _controllers) {
      controller.dispose();
    }
    super.dispose();
  }
}
\`\`\`

## 9.4 Performance Optimization for Animations

Optimizing animations is crucial for maintaining smooth performance, especially on lower-end devices.

### Animation Best Practices

1. **Use AnimatedBuilder sparingly:** Only rebuild the necessary parts
2. **Dispose controllers properly:** Prevent memory leaks
3. **Use const constructors:** Reduce widget rebuilds
4. **Optimize custom painting:** Minimize canvas operations
5. **Profile animations:** Use Flutter DevTools to identify bottlenecks

### Performance Monitoring

\`\`\`dart
class PerformanceMonitor {
  static void measureAnimationPerformance(String name, Function() animation) {
    final stopwatch = Stopwatch()..start();
    animation();
    stopwatch.stop();
    
    if (kDebugMode) {
      print('\$name took \${stopwatch.elapsedMilliseconds}ms');
    }
  }
}
\`\`\`

By mastering advanced animation and custom painting techniques, you can create visually stunning and performant Flutter applications that provide engaging user experiences.
          `
        },
        {
          id: 10,
          title: "The Future of Flutter",
          sections: [
            "Upcoming Flutter Features",
            "Platform Expansion",
            "Performance Improvements",
            "Community and Ecosystem Growth"
          ],
          readTime: "20 min",
          content: `
# Chapter 10: The Future of Flutter

Flutter continues to evolve rapidly, with new features, platform support, and performance improvements being added regularly. This chapter explores the future direction of Flutter and what developers can expect in upcoming releases.

## 10.1 Upcoming Flutter Features

Flutter's roadmap includes several exciting features that will enhance developer productivity and application capabilities.

### Material 3 Support

Flutter is working on comprehensive Material 3 support, including:
- Dynamic color schemes
- Advanced theming capabilities
- New Material 3 components
- Improved accessibility features

### Enhanced Web Support

Web development with Flutter is continuously improving:
- Better performance optimizations
- Improved SEO capabilities
- Enhanced PWA support
- Better browser compatibility

### Desktop Enhancements

Desktop support is expanding with:
- Native window management
- Platform-specific integrations
- Improved performance
- Better accessibility support

## 10.2 Platform Expansion

Flutter's reach is expanding to new platforms and use cases.

### Embedded Systems

Flutter is exploring embedded systems development:
- IoT device interfaces
- Automotive infotainment systems
- Industrial control panels
- Smart home applications

### Wearable Devices

Support for wearable platforms:
- Smartwatch applications
- Fitness tracker interfaces
- Health monitoring apps
- Wearable-specific UI patterns

### Gaming and Entertainment

Flutter's potential in gaming:
- 2D game development
- Interactive entertainment apps
- Educational games
- AR/VR integration possibilities

## 10.3 Performance Improvements

Flutter's performance continues to improve with each release.

### Rendering Optimizations

- **Skia improvements:** Enhanced graphics rendering
- **Memory management:** Better garbage collection
- **Hot reload:** Faster development cycles
- **Build optimizations:** Reduced app sizes

### Compilation Enhancements

- **AOT compilation:** Better runtime performance
- **Tree shaking:** Smaller app bundles
- **Code splitting:** Improved loading times
- **Lazy loading:** Better resource management

## 10.4 Community and Ecosystem Growth

The Flutter ecosystem is growing rapidly, providing developers with more tools and resources.

### Package Ecosystem

The pub.dev repository continues to expand:
- **State management:** New solutions and improvements
- **UI components:** Rich widget libraries
- **Platform integration:** Native functionality wrappers
- **Development tools:** Enhanced debugging and profiling

### Community Contributions

The Flutter community is actively contributing:
- **Open source packages:** High-quality libraries
- **Documentation:** Comprehensive guides and tutorials
- **Sample applications:** Real-world examples
- **Best practices:** Shared knowledge and patterns

### Learning Resources

Educational content is expanding:
- **Official documentation:** Comprehensive guides
- **Video tutorials:** Visual learning resources
- **Blog posts:** Technical articles and insights
- **Conference talks:** Expert presentations and workshops

## 10.5 Staying Current with Flutter

To stay current with Flutter's evolution:

### Follow Official Channels

- **Flutter blog:** Official announcements and updates
- **GitHub repository:** Source code and issues
- **Discord/Slack:** Community discussions
- **YouTube channel:** Video content and tutorials

### Participate in the Community

- **Contribute to packages:** Share your solutions
- **Write blog posts:** Share your knowledge
- **Attend conferences:** Network and learn
- **Join local meetups:** Connect with other developers

### Continuous Learning

- **Experiment with new features:** Try beta releases
- **Read release notes:** Understand changes
- **Follow best practices:** Stay updated with guidelines
- **Practice regularly:** Build projects and experiment

The future of Flutter is bright, with continuous improvements, new platform support, and a growing ecosystem. By staying engaged with the community and keeping up with the latest developments, you can leverage Flutter's full potential and build amazing applications.

As Flutter continues to evolve, it's important to embrace change, experiment with new features, and contribute to the community. The skills you've developed through this book will serve as a solid foundation for adapting to Flutter's future developments and building innovative applications that push the boundaries of what's possible with cross-platform development.
          `
        }
      ]
    },
    {
      id: 2,
      title: "Advanced Patterns and Architecture",
      description: "Master responsive design, MVVM, state management, and clean architecture",
      chapters: [
        {
          id: 11,
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
        },
        {
          id: 12,
          title: "MVVM Architecture in Flutter",
          sections: [
            "Understanding MVVM Pattern",
            "Implementing ViewModels",
            "Data Binding and State Management",
            "Testing MVVM Components"
          ],
          readTime: "40 min",
          content: `
# Chapter 12: MVVM Architecture in Flutter

Model-View-ViewModel (MVVM) is a powerful architectural pattern that promotes separation of concerns, testability, and maintainability in Flutter applications. This chapter explores how to implement MVVM effectively in Flutter using modern state management solutions.

## 12.1 Understanding MVVM Pattern

MVVM separates your application into three distinct layers:

- **Model**: Data and business logic
- **View**: UI components (Widgets)
- **ViewModel**: Mediates between Model and View, contains presentation logic

### Benefits of MVVM in Flutter

\`\`\`dart
// Traditional approach - tightly coupled
class UserProfilePage extends StatefulWidget {
  @override
  _UserProfilePageState createState() => _UserProfilePageState();
}

class _UserProfilePageState extends State<UserProfilePage> {
  User? user;
  bool isLoading = false;
  
  @override
  void initState() {
    super.initState();
    _loadUser(); // Business logic mixed with UI
  }
  
  Future<void> _loadUser() async {
    setState(() => isLoading = true);
    // Direct API call in UI layer
    user = await ApiService.getUser();
    setState(() => isLoading = false);
  }
  
  @override
  Widget build(BuildContext context) {
    // UI code mixed with state management
    return Scaffold(/* ... */);
  }
}
\`\`\`

## 12.2 Implementing ViewModels

ViewModels in Flutter can be implemented using various state management solutions. Here's an example using Provider:

\`\`\`dart
// Model
class User {
  final String id;
  final String name;
  final String email;
  final String avatarUrl;
  
  User({
    required this.id,
    required this.name,
    required this.email,
    required this.avatarUrl,
  });
  
  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      name: json['name'],
      email: json['email'],
      avatarUrl: json['avatarUrl'],
    );
  }
}

// ViewModel
class UserProfileViewModel extends ChangeNotifier {
  final UserRepository _userRepository;
  
  UserProfileViewModel(this._userRepository);
  
  User? _user;
  bool _isLoading = false;
  String? _errorMessage;
  
  // Getters for View to access state
  User? get user => _user;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;
  bool get hasError => _errorMessage != null;
  
  // Commands for View to trigger actions
  Future<void> loadUser(String userId) async {
    _setLoading(true);
    _clearError();
    
    try {
      _user = await _userRepository.getUser(userId);
    } catch (e) {
      _errorMessage = 'Failed to load user: \${e.toString()}';
    } finally {
      _setLoading(false);
    }
  }
  
  Future<void> updateUser(User updatedUser) async {
    _setLoading(true);
    _clearError();
    
    try {
      _user = await _userRepository.updateUser(updatedUser);
    } catch (e) {
      _errorMessage = 'Failed to update user: \${e.toString()}';
    } finally {
      _setLoading(false);
    }
  }
  
  void _setLoading(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }
  
  void _clearError() {
    _errorMessage = null;
    notifyListeners();
  }
}
\`\`\`

## 12.3 Data Binding and State Management

The View layer binds to the ViewModel and reacts to state changes:

\`\`\`dart
// View
class UserProfilePage extends StatelessWidget {
  final String userId;
  
  const UserProfilePage({required this.userId});
  
  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => UserProfileViewModel(
        context.read<UserRepository>(),
      )..loadUser(userId),
      child: Scaffold(
        appBar: AppBar(title: Text('User Profile')),
        body: Consumer<UserProfileViewModel>(
          builder: (context, viewModel, child) {
            if (viewModel.isLoading) {
              return Center(child: CircularProgressIndicator());
            }
            
            if (viewModel.hasError) {
              return Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(viewModel.errorMessage!),
                    ElevatedButton(
                      onPressed: () => viewModel.loadUser(userId),
                      child: Text('Retry'),
                    ),
                  ],
                ),
              );
            }
            
            if (viewModel.user == null) {
              return Center(child: Text('No user found'));
            }
            
            return _buildUserProfile(context, viewModel);
          },
        ),
      ),
    );
  }
  
  Widget _buildUserProfile(BuildContext context, UserProfileViewModel viewModel) {
    final user = viewModel.user!;
    
    return Padding(
      padding: EdgeInsets.all(16),
      child: Column(
        children: [
          CircleAvatar(
            radius: 50,
            backgroundImage: NetworkImage(user.avatarUrl),
          ),
          SizedBox(height: 16),
          Text(
            user.name,
            style: Theme.of(context).textTheme.headlineSmall,
          ),
          Text(
            user.email,
            style: Theme.of(context).textTheme.bodyLarge,
          ),
          SizedBox(height: 32),
          ElevatedButton(
            onPressed: () => _showEditDialog(context, viewModel, user),
            child: Text('Edit Profile'),
          ),
        ],
      ),
    );
  }
  
  void _showEditDialog(BuildContext context, UserProfileViewModel viewModel, User user) {
    // Edit dialog implementation
  }
}
\`\`\`

## 12.4 Testing MVVM Components

MVVM architecture makes testing much easier by separating concerns:

\`\`\`dart
// ViewModel Test
class MockUserRepository extends Mock implements UserRepository {}

void main() {
  group('UserProfileViewModel', () {
    late MockUserRepository mockRepository;
    late UserProfileViewModel viewModel;
    
    setUp(() {
      mockRepository = MockUserRepository();
      viewModel = UserProfileViewModel(mockRepository);
    });
    
    test('should load user successfully', () async {
      // Arrange
      final user = User(
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        avatarUrl: 'https://example.com/avatar.jpg',
      );
      when(mockRepository.getUser('1')).thenAnswer((_) async => user);
      
      // Act
      await viewModel.loadUser('1');
      
      // Assert
      expect(viewModel.user, equals(user));
      expect(viewModel.isLoading, false);
      expect(viewModel.hasError, false);
    });
    
    test('should handle load user error', () async {
      // Arrange
      when(mockRepository.getUser('1')).thenThrow(Exception('Network error'));
      
      // Act
      await viewModel.loadUser('1');
      
      // Assert
      expect(viewModel.user, isNull);
      expect(viewModel.isLoading, false);
      expect(viewModel.hasError, true);
      expect(viewModel.errorMessage, contains('Network error'));
    });
  });
}
\`\`\`

MVVM architecture in Flutter promotes clean, testable, and maintainable code by clearly separating presentation logic from UI components and business logic. This separation makes your code easier to understand, test, and modify as your application grows.
          `
        },
        {
          id: 13,
          title: "Advanced Navigation and Routing",
          sections: [
            "Custom Route Transitions",
            "Deep Linking and URL Management",
            "Navigation State Management",
            "Complex Navigation Patterns"
          ],
          readTime: "35 min",
          content: `
# Chapter 13: Advanced Navigation and Routing

Navigation is a fundamental aspect of any mobile application. Flutter provides a robust navigation system that can handle complex routing scenarios, deep linking, and custom transitions.

## 13.1 Custom Route Transitions

Flutter's navigation system allows you to create custom route transitions that enhance the user experience.

\`\`\`dart
class CustomPageRoute extends PageRouteBuilder {
  final Widget child;
  
  CustomPageRoute({required this.child})
      : super(
          pageBuilder: (context, animation, secondaryAnimation) => child,
          transitionsBuilder: (context, animation, secondaryAnimation, child) {
            return SlideTransition(
              position: Tween<Offset>(
                begin: const Offset(1.0, 0.0),
                end: Offset.zero,
              ).animate(animation),
              child: child,
            );
          },
        );
}

// Usage
Navigator.push(
  context,
  CustomPageRoute(child: DetailPage()),
);
\`\`\`

## 13.2 Deep Linking and URL Management

Deep linking allows users to navigate directly to specific content within your app.

\`\`\`dart
class DeepLinkHandler {
  static void handleDeepLink(String link) {
    final uri = Uri.parse(link);
    final path = uri.path;
    
    switch (path) {
      case '/product':
        final productId = uri.queryParameters['id'];
        Navigator.pushNamed(context, '/product', arguments: productId);
        break;
      case '/category':
        final categoryId = uri.queryParameters['id'];
        Navigator.pushNamed(context, '/category', arguments: categoryId);
        break;
    }
  }
}
\`\`\`

## 13.3 Navigation State Management

Managing navigation state is crucial for complex applications.

\`\`\`dart
class NavigationService {
  static final GlobalKey<NavigatorState> navigatorKey = GlobalKey<NavigatorState>();
  
  static Future<dynamic> navigateTo(String routeName, {Object? arguments}) {
    return navigatorKey.currentState!.pushNamed(routeName, arguments: arguments);
  }
  
  static void goBack() {
    navigatorKey.currentState!.pop();
  }
}

// Usage in main.dart
MaterialApp(
  navigatorKey: NavigationService.navigatorKey,
  // ... other properties
)
\`\`\`

## 13.4 Complex Navigation Patterns

Advanced navigation patterns for complex applications.

\`\`\`dart
class BottomNavigationWithNestedRoutes extends StatefulWidget {
  @override
  _BottomNavigationWithNestedRoutesState createState() => _BottomNavigationWithNestedRoutesState();
}

class _BottomNavigationWithNestedRoutesState extends State<BottomNavigationWithNestedRoutes> {
  int _currentIndex = 0;
  
  final List<Widget> _pages = [
    HomePage(),
    SearchPage(),
    ProfilePage(),
  ];
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: IndexedStack(
        index: _currentIndex,
        children: _pages,
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (index) {
          setState(() {
            _currentIndex = index;
          });
        },
        items: [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
          BottomNavigationBarItem(icon: Icon(Icons.search), label: 'Search'),
          BottomNavigationBarItem(icon: Icon(Icons.person), label: 'Profile'),
        ],
      ),
    );
  }
}
\`\`\`

Advanced navigation patterns help create intuitive and efficient user experiences in Flutter applications.
          `
        },
        {
          id: 14,
          title: "Custom Widgets and Composability",
          sections: [
            "Building Reusable Widgets",
            "Widget Composition Patterns",
            "Custom Paint and Canvas",
            "Performance Optimization for Custom Widgets"
          ],
          readTime: "40 min",
          content: `
# Chapter 14: Custom Widgets and Composability

Creating custom widgets is essential for building maintainable and reusable Flutter applications. This chapter explores advanced techniques for building custom widgets and optimizing their performance.

## 14.1 Building Reusable Widgets

Reusable widgets are the foundation of maintainable Flutter code.

\`\`\`dart
class CustomButton extends StatelessWidget {
  final String text;
  final VoidCallback onPressed;
  final Color? backgroundColor;
  final Color? textColor;
  
  const CustomButton({
    Key? key,
    required this.text,
    required this.onPressed,
    this.backgroundColor,
    this.textColor,
  }) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: onPressed,
      style: ElevatedButton.styleFrom(
        backgroundColor: backgroundColor ?? Theme.of(context).primaryColor,
        foregroundColor: textColor ?? Colors.white,
        padding: EdgeInsets.symmetric(horizontal: 24, vertical: 12),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8),
        ),
      ),
      child: Text(text),
    );
  }
}

// Usage
CustomButton(
  text: 'Click Me',
  onPressed: () => print('Button pressed'),
  backgroundColor: Colors.blue,
)
\`\`\`

## 14.2 Widget Composition Patterns

Composition over inheritance is a key principle in Flutter.

\`\`\`dart
class CardWidget extends StatelessWidget {
  final Widget child;
  final EdgeInsets? padding;
  final Color? backgroundColor;
  final double? elevation;
  
  const CardWidget({
    Key? key,
    required this.child,
    this.padding,
    this.backgroundColor,
    this.elevation,
  }) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: elevation ?? 2,
      color: backgroundColor,
      child: Padding(
        padding: padding ?? EdgeInsets.all(16),
        child: child,
      ),
    );
  }
}

// Usage with composition
CardWidget(
  child: Column(
    children: [
      Text('Title'),
      Text('Description'),
    ],
  ),
)
\`\`\`

## 14.3 Custom Paint and Canvas

Custom painting allows you to create unique visual effects.

\`\`\`dart
class CustomPainterWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return CustomPaint(
      painter: MyCustomPainter(),
      child: Container(
        width: 200,
        height: 200,
      ),
    );
  }
}

class MyCustomPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = Colors.blue
      ..style = PaintingStyle.fill;
    
    canvas.drawCircle(
      Offset(size.width / 2, size.height / 2),
      50,
      paint,
    );
  }
  
  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
\`\`\`

## 14.4 Performance Optimization for Custom Widgets

Optimizing custom widgets for performance is crucial.

\`\`\`dart
class OptimizedWidget extends StatelessWidget {
  final String title;
  final String description;
  
  const OptimizedWidget({
    Key? key,
    required this.title,
    required this.description,
  }) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(title, style: Theme.of(context).textTheme.headline6),
        Text(description, style: Theme.of(context).textTheme.bodyText2),
      ],
    );
  }
}

// Usage with const constructor
const OptimizedWidget(
  title: 'My Title',
  description: 'My Description',
)
\`\`\`

Custom widgets and composition patterns enable you to create flexible, maintainable, and performant Flutter applications.
          `
        },
        {
          id: 15,
          title: "Internationalization and Localization",
          sections: [
            "Setting Up i18n in Flutter",
            "Managing Translations",
            "RTL Language Support",
            "Dynamic Language Switching"
          ],
          readTime: "30 min",
          content: `
# Chapter 15: Internationalization and Localization

Internationalization (i18n) and localization (l10n) are essential for creating applications that can serve users worldwide. Flutter provides excellent support for multiple languages and cultures.

## 15.1 Setting Up i18n in Flutter

Flutter's internationalization system is built on the intl package.

\`\`\`dart
// pubspec.yaml
dependencies:
  flutter:
    sdk: flutter
  flutter_localizations:
    sdk: flutter
  intl: ^0.18.0

// main.dart
import 'package:flutter_localizations/flutter_localizations.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      localizationsDelegates: [
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      supportedLocales: [
        const Locale('en', 'US'),
        const Locale('es', 'ES'),
        const Locale('ar', 'SA'),
      ],
      home: HomePage(),
    );
  }
}
\`\`\`

## 15.2 Managing Translations

Organizing translations efficiently is crucial for maintainability.

\`\`\`dart
// l10n/app_en.arb
{
  "helloWorld": "Hello World",
  "@helloWorld": {
    "description": "A greeting message"
  },
  "welcomeMessage": "Welcome, {name}",
  "@welcomeMessage": {
    "description": "A welcome message with parameter",
    "placeholders": {
      "name": {
        "type": "String"
      }
    }
  }
}

// l10n/app_es.arb
{
  "helloWorld": "Hola Mundo",
  "welcomeMessage": "Bienvenido, {name}"
}

// Usage in code
class MyWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Text(AppLocalizations.of(context)!.helloWorld);
  }
}
\`\`\`

## 15.3 RTL Language Support

Right-to-left language support is essential for languages like Arabic and Hebrew.

\`\`\`dart
class RTLWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Directionality(
      textDirection: TextDirection.rtl,
      child: Row(
        children: [
          Icon(Icons.arrow_back),
          Text('Back'),
        ],
      ),
    );
  }
}

// Automatic RTL detection
class AutoRTLWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final locale = Localizations.localeOf(context);
    final isRTL = locale.languageCode == 'ar' || locale.languageCode == 'he';
    
    return Directionality(
      textDirection: isRTL ? TextDirection.rtl : TextDirection.ltr,
      child: YourWidget(),
    );
  }
}
\`\`\`

## 15.4 Dynamic Language Switching

Allowing users to change language at runtime.

\`\`\`dart
class LanguageProvider extends ChangeNotifier {
  Locale _locale = Locale('en');
  
  Locale get locale => _locale;
  
  void setLocale(Locale locale) {
    _locale = locale;
    notifyListeners();
  }
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => LanguageProvider(),
      child: Consumer<LanguageProvider>(
        builder: (context, provider, child) {
          return MaterialApp(
            locale: provider.locale,
            localizationsDelegates: [
              GlobalMaterialLocalizations.delegate,
              GlobalWidgetsLocalizations.delegate,
              AppLocalizations.delegate,
            ],
            supportedLocales: [
              Locale('en'),
              Locale('es'),
              Locale('ar'),
            ],
            home: HomePage(),
          );
        },
      ),
    );
  }
}
\`\`\`

Proper internationalization ensures your app can reach a global audience effectively.
          `
        },
        {
          id: 16,
          title: "Security Best Practices",
          sections: [
            "Secure Data Storage",
            "Network Security",
            "Code Obfuscation",
            "Platform-Specific Security"
          ],
          readTime: "35 min",
          content: `
# Chapter 16: Security Best Practices

Security is paramount in mobile application development. This chapter covers essential security practices for Flutter applications, from data storage to network communication.

## 16.1 Secure Data Storage

Protecting sensitive data is crucial for user privacy and compliance.

\`\`\`dart
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class SecureStorageService {
  static const FlutterSecureStorage _storage = FlutterSecureStorage();
  
  static Future<void> saveToken(String token) async {
    await _storage.write(key: 'auth_token', value: token);
  }
  
  static Future<String?> getToken() async {
    return await _storage.read(key: 'auth_token');
  }
  
  static Future<void> deleteToken() async {
    await _storage.delete(key: 'auth_token');
  }
  
  static Future<void> saveUserData(Map<String, dynamic> userData) async {
    final jsonString = jsonEncode(userData);
    await _storage.write(key: 'user_data', value: jsonString);
  }
  
  static Future<Map<String, dynamic>?> getUserData() async {
    final jsonString = await _storage.read(key: 'user_data');
    if (jsonString != null) {
      return jsonDecode(jsonString);
    }
    return null;
  }
}
\`\`\`

## 16.2 Network Security

Securing network communications is essential for protecting data in transit.

\`\`\`dart
import 'package:dio/dio.dart';
import 'package:dio/io.dart';

class SecureApiService {
  late Dio _dio;
  
  SecureApiService() {
    _dio = Dio();
    
    // Configure SSL pinning
    (_dio.httpClientAdapter as DefaultHttpClientAdapter).onHttpClientCreate =
        (HttpClient client) {
      client.badCertificateCallback = (cert, host, port) {
        // Implement certificate pinning logic
        return _isValidCertificate(cert, host);
      };
      return client;
    };
    
    // Add security headers
    _dio.interceptors.add(InterceptorsWrapper(
      onRequest: (options, handler) {
        options.headers['X-API-Key'] = 'your-api-key';
        options.headers['User-Agent'] = 'YourApp/1.0';
        handler.next(options);
      },
    ));
  }
  
  bool _isValidCertificate(X509Certificate cert, String host) {
    // Implement certificate validation logic
    return cert.subject.contains('your-domain.com');
  }
  
  Future<dynamic> secureGet(String url) async {
    try {
      final response = await _dio.get(url);
      return response.data;
    } on DioException catch (e) {
      throw SecurityException('Network security error: \${e.message}');
    }
  }
}
\`\`\`

## 16.3 Code Obfuscation

Protecting your code from reverse engineering.

\`\`\`yaml
# pubspec.yaml
flutter:
  obfuscate: true
  split-debug-info: build/debug-info

# Build command
flutter build apk --release --obfuscate --split-debug-info=build/debug-info
\`\`\`

\`\`\`dart
// ProGuard rules for Android
-keep class io.flutter.app.** { *; }
-keep class io.flutter.plugin.** { *; }
-keep class io.flutter.util.** { *; }
-keep class io.flutter.view.** { *; }
-keep class io.flutter.** { *; }
-keep class io.flutter.plugins.** { *; }

// Keep your sensitive classes
-keep class com.example.myapp.SensitiveClass { *; }
\`\`\`

## 16.4 Platform-Specific Security

Different platforms require different security approaches.

\`\`\`dart
// Android-specific security
import 'package:flutter/services.dart';

class AndroidSecurity {
  static const MethodChannel _channel = MethodChannel('security_channel');
  
  static Future<void> enableBiometricAuth() async {
    try {
      await _channel.invokeMethod('enableBiometricAuth');
    } on PlatformException catch (e) {
      print('Biometric auth error: \${e.message}');
    }
  }
  
  static Future<bool> isDeviceSecure() async {
    try {
      final result = await _channel.invokeMethod('isDeviceSecure');
      return result as bool;
    } on PlatformException catch (e) {
      return false;
    }
  }
}

// iOS-specific security
class IOSSecurity {
  static const MethodChannel _channel = MethodChannel('security_channel');
  
  static Future<void> enableKeychainAccess() async {
    try {
      await _channel.invokeMethod('enableKeychainAccess');
    } on PlatformException catch (e) {
      print('Keychain access error: \${e.message}');
    }
  }
}
\`\`\`

## 16.5 Security Best Practices Summary

1. **Never store sensitive data in plain text**
2. **Use HTTPS for all network communications**
3. **Implement certificate pinning**
4. **Obfuscate your code for release builds**
5. **Validate all user inputs**
6. **Use platform-specific security features**
7. **Regularly update dependencies**
8. **Implement proper error handling**

Security should be a fundamental consideration in every aspect of your Flutter application development.
          `
        },
        {
          id: 17,
          title: "Advanced Animation Techniques",
          sections: [
            "Complex Animation Sequences",
            "Custom Animation Curves",
            "Hero Animations",
            "Performance Optimization for Animations"
          ],
          readTime: "40 min",
          content: `
# Chapter 17: Advanced Animation Techniques

Advanced animations can significantly enhance user experience and make your Flutter applications feel more polished and professional. This chapter explores sophisticated animation techniques and performance optimization strategies.

## 17.1 Complex Animation Sequences

Creating coordinated animation sequences requires careful planning and implementation.

\`\`\`dart
class ComplexAnimationWidget extends StatefulWidget {
  @override
  _ComplexAnimationWidgetState createState() => _ComplexAnimationWidgetState();
}

class _ComplexAnimationWidgetState extends State<ComplexAnimationWidget>
    with TickerProviderStateMixin {
  late AnimationController _mainController;
  late AnimationController _secondaryController;
  
  late Animation<double> _scaleAnimation;
  late Animation<double> _rotationAnimation;
  late Animation<Color?> _colorAnimation;
  late Animation<Offset> _slideAnimation;
  
  @override
  void initState() {
    super.initState();
    
    _mainController = AnimationController(
      duration: Duration(seconds: 2),
      vsync: this,
    );
    
    _secondaryController = AnimationController(
      duration: Duration(milliseconds: 500),
      vsync: this,
    );
    
    // Create coordinated animations
    _scaleAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _mainController,
      curve: Interval(0.0, 0.5, curve: Curves.elasticOut),
    ));
    
    _rotationAnimation = Tween<double>(
      begin: 0.0,
      end: 2 * pi,
    ).animate(CurvedAnimation(
      parent: _mainController,
      curve: Interval(0.2, 0.8, curve: Curves.easeInOut),
    ));
    
    _colorAnimation = ColorTween(
      begin: Colors.red,
      end: Colors.blue,
    ).animate(CurvedAnimation(
      parent: _mainController,
      curve: Interval(0.5, 1.0, curve: Curves.easeIn),
    ));
    
    _slideAnimation = Tween<Offset>(
      begin: Offset(0, 1),
      end: Offset.zero,
    ).animate(CurvedAnimation(
      parent: _mainController,
      curve: Interval(0.3, 0.7, curve: Curves.bounceOut),
    ));
  }
  
  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _mainController,
      builder: (context, child) {
        return Transform.scale(
          scale: _scaleAnimation.value,
          child: Transform.rotate(
            angle: _rotationAnimation.value,
            child: SlideTransition(
              position: _slideAnimation,
              child: Container(
                width: 100,
                height: 100,
                decoration: BoxDecoration(
                  color: _colorAnimation.value,
                  borderRadius: BorderRadius.circular(50),
                ),
              ),
            ),
          ),
        );
      },
    );
  }
  
  @override
  void dispose() {
    _mainController.dispose();
    _secondaryController.dispose();
    super.dispose();
  }
}
\`\`\`

## 17.2 Custom Animation Curves

Creating custom animation curves allows for unique animation behaviors.

\`\`\`dart
class CustomCurve extends Curve {
  @override
  double transform(double t) {
    // Custom curve: starts slow, accelerates in middle, slows at end
    return t * t * (3.0 - 2.0 * t);
  }
}

class BounceCurve extends Curve {
  final double intensity;
  
  BounceCurve({this.intensity = 1.0});
  
  @override
  double transform(double t) {
    return 1.0 - intensity * (1.0 - t) * (1.0 - t);
  }
}

// Usage
Animation<double> customAnimation = Tween<double>(
  begin: 0.0,
  end: 1.0,
).animate(CurvedAnimation(
  parent: controller,
  curve: CustomCurve(),
));
\`\`\`

## 17.3 Hero Animations

Hero animations create smooth transitions between screens.

\`\`\`dart
// First screen
class FirstScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Hero(
          tag: 'sharedElement',
          child: Container(
            width: 100,
            height: 100,
            decoration: BoxDecoration(
              color: Colors.blue,
              borderRadius: BorderRadius.circular(20),
            ),
            child: Icon(Icons.star, color: Colors.white),
          ),
        ),
      ),
    );
  }
}

// Second screen
class SecondScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Detail')),
      body: Center(
        child: Hero(
          tag: 'sharedElement',
          child: Container(
            width: 200,
            height: 200,
            decoration: BoxDecoration(
              color: Colors.blue,
              borderRadius: BorderRadius.circular(20),
            ),
            child: Icon(Icons.star, color: Colors.white, size: 50),
          ),
        ),
      ),
    );
  }
}

// Navigation with custom transition
Navigator.push(
  context,
  PageRouteBuilder(
    pageBuilder: (context, animation, secondaryAnimation) => SecondScreen(),
    transitionsBuilder: (context, animation, secondaryAnimation, child) {
      return FadeTransition(
        opacity: animation,
        child: child,
      );
    },
  ),
);
\`\`\`

## 17.4 Performance Optimization for Animations

Optimizing animations is crucial for maintaining smooth performance.

\`\`\`dart
class OptimizedAnimationWidget extends StatefulWidget {
  @override
  _OptimizedAnimationWidgetState createState() => _OptimizedAnimationWidgetState();
}

class _OptimizedAnimationWidgetState extends State<OptimizedAnimationWidget>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;
  
  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: Duration(seconds: 1),
      vsync: this,
    );
    _animation = Tween<double>(begin: 0, end: 1).animate(_controller);
  }
  
  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _animation,
      builder: (context, child) {
        // Use RepaintBoundary to optimize repaints
        return RepaintBoundary(
          child: Transform.scale(
            scale: _animation.value,
            child: Container(
              width: 100,
              height: 100,
              color: Colors.blue,
            ),
          ),
        );
      },
    );
  }
  
  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
}

// Performance monitoring
class AnimationPerformanceMonitor {
  static void measureAnimationPerformance(String name, Function() animation) {
    final stopwatch = Stopwatch()..start();
    animation();
    stopwatch.stop();
    
    if (kDebugMode) {
      print('\$name took \${stopwatch.elapsedMilliseconds}ms');
    }
  }
}
\`\`\`

## 17.5 Animation Best Practices

1. **Use const constructors** for static widgets
2. **Implement proper dispose methods** to prevent memory leaks
3. **Use RepaintBoundary** for complex animations
4. **Monitor frame rates** during development
5. **Test on low-end devices** to ensure performance
6. **Use appropriate curves** for natural motion
7. **Avoid nested animations** when possible
8. **Profile animations** using Flutter DevTools

Advanced animation techniques can transform your Flutter applications into engaging, professional experiences that delight users.
          `
        },

      ]
    },
    {
      id: 3,
      title: "Practical Applications and Problem Solving",
      description: "Essential packages, new widgets, and real-world problem solving",
      chapters: [
        {
          id: 18,
          title: "Essential Flutter Packages",
          sections: [
            "State Management: Provider, Riverpod, BLoC",
            "Network and API: Dio, Retrofit, Chopper",
            "Local Storage: Hive, Sqflite, Shared Preferences",
            "Utility and Platform Integration"
          ],
          readTime: "45 min",
          content: `
# Chapter 18: Essential Flutter Packages

The Flutter ecosystem is rich with packages that can significantly accelerate your development process and add powerful functionality to your applications. This chapter covers the most essential packages every Flutter developer should know, organized by category and use case.

## 18.1 State Management: Provider, Riverpod, BLoC

State management is crucial for building scalable Flutter applications. Different packages offer different approaches to managing application state.

### Provider - Simple and Intuitive

Provider is one of the most popular state management solutions, officially recommended by the Flutter team.

\`\`\`dart
// Counter example with Provider
class Counter extends ChangeNotifier {
  int _count = 0;
  
  int get count => _count;
  
  void increment() {
    _count++;
    notifyListeners();
  }
  
  void decrement() {
    _count--;
    notifyListeners();
  }
}

// Usage in main.dart
void main() {
  runApp(
    ChangeNotifierProvider(
      create: (context) => Counter(),
      child: MyApp(),
    ),
  );
}

// Usage in widget
class CounterWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Consumer<Counter>(
      builder: (context, counter, child) {
        return Column(
          children: [
            Text('Count: \${counter.count}'),
            Row(
              children: [
                ElevatedButton(
                  onPressed: counter.increment,
                  child: Text('+'),
                ),
                ElevatedButton(
                  onPressed: counter.decrement,
                  child: Text('-'),
                ),
              ],
            ),
          ],
        );
      },
    );
  }
}
\`\`\`

### Riverpod - Provider's Evolution

Riverpod is the next generation of Provider, offering better performance, safety, and developer experience.

\`\`\`dart
// Counter with Riverpod
final counterProvider = StateNotifierProvider<CounterNotifier, int>((ref) {
  return CounterNotifier();
});

class CounterNotifier extends StateNotifier<int> {
  CounterNotifier() : super(0);
  
  void increment() => state++;
  void decrement() => state--;
}

// Usage
class CounterWidget extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final count = ref.watch(counterProvider);
    final counterNotifier = ref.read(counterProvider.notifier);
    
    return Column(
      children: [
        Text('Count: \$count'),
        Row(
          children: [
            ElevatedButton(
              onPressed: counterNotifier.increment,
              child: Text('+'),
            ),
            ElevatedButton(
              onPressed: counterNotifier.decrement,
              child: Text('-'),
            ),
          ],
        ),
      ],
    );
  }
}
\`\`\`

### BLoC - Business Logic Component

BLoC pattern separates business logic from UI components using streams and events.

\`\`\`dart
// Events
abstract class CounterEvent {}
class CounterIncremented extends CounterEvent {}
class CounterDecremented extends CounterEvent {}

// States
class CounterState {
  final int count;
  CounterState(this.count);
}

// BLoC
class CounterBloc extends Bloc<CounterEvent, CounterState> {
  CounterBloc() : super(CounterState(0)) {
    on<CounterIncremented>((event, emit) {
      emit(CounterState(state.count + 1));
    });
    
    on<CounterDecremented>((event, emit) {
      emit(CounterState(state.count - 1));
    });
  }
}

// Usage
class CounterWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return BlocBuilder<CounterBloc, CounterState>(
      builder: (context, state) {
        return Column(
          children: [
            Text('Count: \${state.count}'),
            Row(
              children: [
                ElevatedButton(
                  onPressed: () => context.read<CounterBloc>().add(CounterIncremented()),
                  child: Text('+'),
                ),
                ElevatedButton(
                  onPressed: () => context.read<CounterBloc>().add(CounterDecremented()),
                  child: Text('-'),
                ),
              ],
            ),
          ],
        );
      },
    );
  }
}
\`\`\`

## 18.2 Network and API: Dio, Retrofit, Chopper

Making HTTP requests and handling API communication is essential for most modern applications.

### Dio - Powerful HTTP Client

Dio is a powerful HTTP client with interceptors, request/response transformation, and more.

\`\`\`dart
class ApiService {
  late Dio _dio;
  
  ApiService() {
    _dio = Dio(BaseOptions(
      baseUrl: 'https://api.example.com',
      connectTimeout: Duration(seconds: 5),
      receiveTimeout: Duration(seconds: 3),
    ));
    
    // Add interceptors
    _dio.interceptors.add(LogInterceptor(
      requestBody: true,
      responseBody: true,
    ));
    
    _dio.interceptors.add(InterceptorsWrapper(
      onRequest: (options, handler) {
        // Add auth token
        options.headers['Authorization'] = 'Bearer \${getToken()}';
        handler.next(options);
      },
      onError: (error, handler) {
        // Handle errors globally
        if (error.response?.statusCode == 401) {
          // Redirect to login
        }
        handler.next(error);
      },
    ));
  }
  
  Future<List<User>> getUsers() async {
    try {
      final response = await _dio.get('/users');
      return (response.data as List)
          .map((json) => User.fromJson(json))
          .toList();
    } on DioException catch (e) {
      throw ApiException.fromDioError(e);
    }
  }
  
  Future<User> createUser(User user) async {
    try {
      final response = await _dio.post('/users', data: user.toJson());
      return User.fromJson(response.data);
    } on DioException catch (e) {
      throw ApiException.fromDioError(e);
    }
  }
}
\`\`\`

## 18.3 Local Storage: Hive, Sqflite, Shared Preferences

Local data storage is crucial for offline functionality and caching.

### Hive - Fast NoSQL Database

Hive is a lightweight and fast key-value database written in pure Dart.

\`\`\`dart
// Model with Hive annotations
@HiveType(typeId: 0)
class User extends HiveObject {
  @HiveField(0)
  String id;
  
  @HiveField(1)
  String name;
  
  @HiveField(2)
  String email;
  
  User({required this.id, required this.name, required this.email});
}

// Repository
class UserRepository {
  static const String _boxName = 'users';
  
  Future<Box<User>> get _box async => await Hive.openBox<User>(_boxName);
  
  Future<void> addUser(User user) async {
    final box = await _box;
    await box.put(user.id, user);
  }
  
  Future<User?> getUser(String id) async {
    final box = await _box;
    return box.get(id);
  }
  
  Future<List<User>> getAllUsers() async {
    final box = await _box;
    return box.values.toList();
  }
  
  Future<void> deleteUser(String id) async {
    final box = await _box;
    await box.delete(id);
  }
}

// Initialize Hive
void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  await Hive.initFlutter();
  Hive.registerAdapter(UserAdapter());
  
  runApp(MyApp());
}
\`\`\`

### Sqflite - SQLite for Flutter

For complex relational data, Sqflite provides a full SQLite implementation.

\`\`\`dart
class DatabaseHelper {
  static final DatabaseHelper _instance = DatabaseHelper._internal();
  factory DatabaseHelper() => _instance;
  DatabaseHelper._internal();
  
  static Database? _database;
  
  Future<Database> get database async {
    _database ??= await _initDatabase();
    return _database!;
  }
  
  Future<Database> _initDatabase() async {
    String path = join(await getDatabasesPath(), 'app_database.db');
    return await openDatabase(
      path,
      version: 1,
      onCreate: _onCreate,
    );
  }
  
  Future<void> _onCreate(Database db, int version) async {
    await db.execute('''
      CREATE TABLE users(
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        created_at INTEGER NOT NULL
      )
    ''');
  }
  
  Future<int> insertUser(User user) async {
    final db = await database;
    return await db.insert('users', user.toMap());
  }
  
  Future<List<User>> getUsers() async {
    final db = await database;
    final List<Map<String, dynamic>> maps = await db.query('users');
    return List.generate(maps.length, (i) => User.fromMap(maps[i]));
  }
  
  Future<int> updateUser(User user) async {
    final db = await database;
    return await db.update(
      'users',
      user.toMap(),
      where: 'id = ?',
      whereArgs: [user.id],
    );
  }
  
  Future<int> deleteUser(String id) async {
    final db = await database;
    return await db.delete(
      'users',
      where: 'id = ?',
      whereArgs: [id],
    );
  }
}
\`\`\`

These essential packages form the foundation of most Flutter applications. Understanding when and how to use each one will significantly improve your development efficiency and application quality.
          `
        },
        {
          id: 20,
          title: "Practical Problem-Solving Scenarios",
          sections: [
            "Handling Large Datasets from APIs",
            "Optimizing App Performance",
            "Debugging Complex Issues",
            "Building for Multiple Environments"
          ],
          readTime: "50 min",
          content: `
# Chapter 20: Practical Problem-Solving Scenarios

Developing real-world Flutter applications often involves tackling complex challenges that go beyond basic UI rendering and state management. This chapter delves into practical problem-solving scenarios that frequently arise in production-grade applications.

## 20.1 Handling Large Datasets from APIs (Millions of Items)

Retrieving and displaying millions of items from an API presents significant challenges in mobile application development. Directly fetching such a massive dataset is impractical due to network latency, memory constraints, and performance issues.

### Pagination and Infinite Scrolling

The most fundamental technique for handling large datasets is pagination combined with infinite scrolling.

\`\`\`dart
class ItemListProvider with ChangeNotifier {
  List<Item> _items = [];
  int _currentPage = 1;
  bool _isLoading = false;
  bool _hasMoreData = true;
  
  List<Item> get items => _items;
  bool get isLoading => _isLoading;
  bool get hasMoreData => _hasMoreData;
  
  Future<void> fetchItems() async {
    if (_isLoading || !_hasMoreData) return;
    
    _isLoading = true;
    notifyListeners();
    
    try {
      final newItems = await _apiService.getItems(
        page: _currentPage, 
        limit: 20
      );
      
      if (newItems.isEmpty) {
        _hasMoreData = false;
      } else {
        _items.addAll(newItems);
        _currentPage++;
      }
    } catch (e) {
      // Handle error
      print("Error fetching items: \$e");
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }
  
  void reset() {
    _items = [];
    _currentPage = 1;
    _isLoading = false;
    _hasMoreData = true;
    notifyListeners();
  }
}

// Usage in Widget
class ItemListPage extends StatefulWidget {
  @override
  State<ItemListPage> createState() => _ItemListPageState();
}

class _ItemListPageState extends State<ItemListPage> {
  final ScrollController _scrollController = ScrollController();
  
  @override
  void initState() {
    super.initState();
    _scrollController.addListener(_onScroll);
    WidgetsBinding.instance.addPostFrameCallback((_) {
      Provider.of<ItemListProvider>(context, listen: false).fetchItems();
    });
  }
  
  void _onScroll() {
    final provider = Provider.of<ItemListProvider>(context, listen: false);
    if (_scrollController.position.pixels >= 
        _scrollController.position.maxScrollExtent * 0.9 &&
        !provider.isLoading &&
        provider.hasMoreData) {
      provider.fetchItems();
    }
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Large Dataset")),
      body: Consumer<ItemListProvider>(
        builder: (context, provider, child) {
          if (provider.items.isEmpty && provider.isLoading) {
            return Center(child: CircularProgressIndicator());
          }
          
          return ListView.builder(
            controller: _scrollController,
            itemCount: provider.items.length + (provider.isLoading ? 1 : 0),
            itemBuilder: (context, index) {
              if (index == provider.items.length) {
                return Padding(
                  padding: EdgeInsets.all(8.0),
                  child: Center(child: CircularProgressIndicator()),
                );
              }
              
              final item = provider.items[index];
              return ListTile(title: Text(item.name));
            },
          );
        },
      ),
    );
  }
}
\`\`\`

### Efficient Data Parsing with Isolates

For large JSON responses, use isolates to prevent UI blocking:

\`\`\`dart
import 'dart:convert';
import 'dart:isolate';
import 'package:flutter/foundation.dart';

// Function to run in isolate
List<Item> parseItems(String responseBody) {
  final parsed = jsonDecode(responseBody) as List<dynamic>;
  return parsed.map<Item>((json) => Item.fromJson(json)).toList();
}

// In your API service
Future<List<Item>> fetchAndParseLargeData() async {
  final response = await dio.get('/large_data');
  
  // Use compute to parse JSON in separate isolate
  return await compute(parseItems, response.data as String);
}
\`\`\`

## 20.2 Optimizing App Performance (Advanced Techniques)

Performance optimization requires understanding Flutter's rendering pipeline and identifying bottlenecks.

### Reducing Widget Rebuilds

\`\`\`dart
// Bad: Rebuilds entire widget tree
class BadExample extends StatefulWidget {
  @override
  _BadExampleState createState() => _BadExampleState();
}

class _BadExampleState extends State<BadExample> {
  int counter = 0;
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        ExpensiveWidget(), // Rebuilds unnecessarily
        Text('Counter: \$counter'),
        ElevatedButton(
          onPressed: () => setState(() => counter++),
          child: Text('Increment'),
        ),
      ],
    );
  }
}

// Good: Isolate rebuilds with const and keys
class GoodExample extends StatefulWidget {
  @override
  _GoodExampleState createState() => _GoodExampleState();
}

class _GoodExampleState extends State<GoodExample> {
  int counter = 0;
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        const ExpensiveWidget(), // Won't rebuild
        CounterDisplay(counter: counter), // Only this rebuilds
        ElevatedButton(
          onPressed: () => setState(() => counter++),
          child: Text('Increment'),
        ),
      ],
    );
  }
}

class CounterDisplay extends StatelessWidget {
  final int counter;
  
  const CounterDisplay({Key? key, required this.counter}) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Text('Counter: \$counter');
  }
}
\`\`\`

### Optimizing Lists with itemExtent

\`\`\`dart
// Optimized ListView with fixed item height
ListView.builder(
  itemExtent: 80.0, // Fixed height improves scroll performance
  itemCount: items.length,
  itemBuilder: (context, index) {
    return ListTile(
      title: Text(items[index].name),
      subtitle: Text(items[index].description),
    );
  },
)
\`\`\`

## 20.3 Debugging Complex Issues

Advanced debugging requires systematic approaches and proper tooling.

### Using Flutter DevTools

\`\`\`dart
// Enable performance overlay in debug mode
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      // Show performance overlay
      showPerformanceOverlay: kDebugMode,
      // Enable debug banner
      debugShowCheckedModeBanner: kDebugMode,
      home: HomePage(),
    );
  }
}

// Custom debug utilities
class DebugUtils {
  static void logWidgetBuild(String widgetName) {
    if (kDebugMode) {
      print('Building \$widgetName at \${DateTime.now()}');
    }
  }
  
  static void measurePerformance(String operation, Function() function) {
    if (kDebugMode) {
      final stopwatch = Stopwatch()..start();
      function();
      stopwatch.stop();
      print('\$operation took \${stopwatch.elapsedMilliseconds}ms');
    } else {
      function();
    }
  }
}
\`\`\`

### Memory Leak Detection

\`\`\`dart
class MemoryLeakDetector {
  static final Map<String, int> _instanceCounts = {};
  
  static void trackInstance(String className) {
    if (kDebugMode) {
      _instanceCounts[className] = (_instanceCounts[className] ?? 0) + 1;
      print('Created \$className. Total: \${_instanceCounts[className]}');
    }
  }
  
  static void untrackInstance(String className) {
    if (kDebugMode) {
      _instanceCounts[className] = (_instanceCounts[className] ?? 1) - 1;
      print('Disposed \$className. Remaining: \${_instanceCounts[className]}');
    }
  }
  
  static void printInstanceCounts() {
    if (kDebugMode) {
      print('Current instance counts:');
      _instanceCounts.forEach((className, count) {
        print('  \$className: \$count');
      });
    }
  }
}

// Usage in StatefulWidget
class TrackedWidget extends StatefulWidget {
  @override
  _TrackedWidgetState createState() => _TrackedWidgetState();
}

class _TrackedWidgetState extends State<TrackedWidget> {
  @override
  void initState() {
    super.initState();
    MemoryLeakDetector.trackInstance('TrackedWidget');
  }
  
  @override
  void dispose() {
    MemoryLeakDetector.untrackInstance('TrackedWidget');
    super.dispose();
  }
  
  @override
  Widget build(BuildContext context) {
    return Container();
  }
}
\`\`\`

## 20.4 Building for Multiple Environments

Managing different configurations for development, staging, and production environments.

### Environment Configuration

\`\`\`dart
enum BuildFlavor {
  development,
  staging,
  production,
}

class AppConfig {
  final BuildFlavor flavor;
  final String baseUrl;
  final String apiKey;
  final bool enableLogging;
  
  AppConfig._({
    required this.flavor,
    required this.baseUrl,
    required this.apiKey,
    required this.enableLogging,
  });
  
  static AppConfig? _instance;
  
  static AppConfig get instance {
    _instance ??= _loadConfig();
    return _instance!;
  }
  
  static AppConfig _loadConfig() {
    const flavorString = String.fromEnvironment(
      "FLAVOR", 
      defaultValue: "development"
    );
    
    switch (flavorString) {
      case "production":
        return AppConfig._(
          flavor: BuildFlavor.production,
          baseUrl: "https://api.myapp.com",
          apiKey: "prod_api_key",
          enableLogging: false,
        );
      case "staging":
        return AppConfig._(
          flavor: BuildFlavor.staging,
          baseUrl: "https://staging-api.myapp.com",
          apiKey: "staging_api_key",
          enableLogging: true,
        );
      case "development":
      default:
        return AppConfig._(
          flavor: BuildFlavor.development,
          baseUrl: "https://dev-api.myapp.com",
          apiKey: "dev_api_key",
          enableLogging: true,
        );
    }
  }
}

// Usage
class ApiService {
  late Dio _dio;
  
  ApiService() {
    final config = AppConfig.instance;
    
    _dio = Dio(BaseOptions(
      baseUrl: config.baseUrl,
      headers: {
        'Authorization': 'Bearer \${config.apiKey}',
      },
    ));
    
    if (config.enableLogging) {
      _dio.interceptors.add(LogInterceptor(
        requestBody: true,
        responseBody: true,
      ));
    }
  }
}
\`\`\`

### Build Scripts for Different Environments

\`\`\`bash
# Build scripts for different environments

# Development
flutter run --dart-define=FLAVOR=development

# Staging
flutter build apk --release --dart-define=FLAVOR=staging

# Production
flutter build apk --release --dart-define=FLAVOR=production
\`\`\`

These practical problem-solving techniques will help you handle real-world challenges in Flutter development, from performance optimization to environment management and debugging complex issues.
          `
        },
        {
          id: 19,
          title: "Advanced State Management Patterns",
          sections: [
            "Multi-Provider Architecture",
            "State Persistence Strategies", 
            "Complex State Synchronization",
            "Testing Advanced State Management"
          ],
          readTime: "45 min",
          content: `
# Chapter 19: Advanced State Management Patterns

As applications grow in complexity, managing state becomes increasingly challenging. This chapter explores advanced state management patterns and strategies for handling complex application state.

## 19.1 Multi-Provider Architecture

Managing multiple providers efficiently is crucial for complex applications.

\`\`\`dart
class AppState extends ChangeNotifier {
  UserState _userState = UserState();
  ThemeState _themeState = ThemeState();
  NavigationState _navigationState = NavigationState();
  
  UserState get userState => _userState;
  ThemeState get themeState => _themeState;
  NavigationState get navigationState => _navigationState;
  
  void updateUser(User user) {
    _userState.updateUser(user);
    notifyListeners();
  }
  
  void toggleTheme() {
    _themeState.toggleTheme();
    notifyListeners();
  }
  
  void updateNavigation(String route) {
    _navigationState.updateRoute(route);
    notifyListeners();
  }
}

class UserState {
  User? _user;
  bool _isLoading = false;
  
  User? get user => _user;
  bool get isLoading => _isLoading;
  
  void updateUser(User user) {
    _user = user;
  }
  
  void setLoading(bool loading) {
    _isLoading = loading;
  }
}

class ThemeState {
  bool _isDarkMode = false;
  
  bool get isDarkMode => _isDarkMode;
  
  void toggleTheme() {
    _isDarkMode = !_isDarkMode;
  }
}

class NavigationState {
  String _currentRoute = '/';
  
  String get currentRoute => _currentRoute;
  
  void updateRoute(String route) {
    _currentRoute = route;
  }
}

// Usage with MultiProvider
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AppState()),
        ChangeNotifierProvider(create: (_) => AuthService()),
        ChangeNotifierProvider(create: (_) => ApiService()),
      ],
      child: MaterialApp(
        home: HomePage(),
      ),
    );
  }
}
\`\`\`

## 19.2 State Persistence Strategies

Persisting state across app sessions is essential for user experience.

\`\`\`dart
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';

class PersistentStateManager extends ChangeNotifier {
  static const String _userKey = 'user_data';
  static const String _settingsKey = 'app_settings';
  static const String _themeKey = 'theme_preference';
  
  User? _user;
  AppSettings _settings = AppSettings();
  bool _isDarkMode = false;
  
  User? get user => _user;
  AppSettings get settings => _settings;
  bool get isDarkMode => _isDarkMode;
  
  Future<void> loadPersistedState() async {
    final prefs = await SharedPreferences.getInstance();
    
    // Load user data
    final userJson = prefs.getString(_userKey);
    if (userJson != null) {
      _user = User.fromJson(jsonDecode(userJson));
    }
    
    // Load settings
    final settingsJson = prefs.getString(_settingsKey);
    if (settingsJson != null) {
      _settings = AppSettings.fromJson(jsonDecode(settingsJson));
    }
    
    // Load theme preference
    _isDarkMode = prefs.getBool(_themeKey) ?? false;
    
    notifyListeners();
  }
  
  Future<void> saveUser(User user) async {
    _user = user;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_userKey, jsonEncode(user.toJson()));
    notifyListeners();
  }
  
  Future<void> saveSettings(AppSettings settings) async {
    _settings = settings;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_settingsKey, jsonEncode(settings.toJson()));
    notifyListeners();
  }
  
  Future<void> saveThemePreference(bool isDarkMode) async {
    _isDarkMode = isDarkMode;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool(_themeKey, isDarkMode);
    notifyListeners();
  }
  
  Future<void> clearAllData() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.clear();
    _user = null;
    _settings = AppSettings();
    _isDarkMode = false;
    notifyListeners();
  }
}

class AppSettings {
  final bool notificationsEnabled;
  final String language;
  final bool autoSave;
  
  AppSettings({
    this.notificationsEnabled = true,
    this.language = 'en',
    this.autoSave = true,
  });
  
  AppSettings copyWith({
    bool? notificationsEnabled,
    String? language,
    bool? autoSave,
  }) {
    return AppSettings(
      notificationsEnabled: notificationsEnabled ?? this.notificationsEnabled,
      language: language ?? this.language,
      autoSave: autoSave ?? this.autoSave,
    );
  }
  
  Map<String, dynamic> toJson() {
    return {
      'notificationsEnabled': notificationsEnabled,
      'language': language,
      'autoSave': autoSave,
    };
  }
  
  factory AppSettings.fromJson(Map<String, dynamic> json) {
    return AppSettings(
      notificationsEnabled: json['notificationsEnabled'] ?? true,
      language: json['language'] ?? 'en',
      autoSave: json['autoSave'] ?? true,
    );
  }
}
\`\`\`

## 19.3 Complex State Synchronization

Synchronizing state across multiple components and services.

\`\`\`dart
class SynchronizedStateManager extends ChangeNotifier {
  final Map<String, dynamic> _state = {};
  final List<Function> _listeners = [];
  
  void setState(String key, dynamic value) {
    _state[key] = value;
    _notifyListeners();
  }
  
  T? getState<T>(String key) {
    return _state[key] as T?;
  }
  
  void addListener(Function listener) {
    _listeners.add(listener);
  }
  
  void removeListener(Function listener) {
    _listeners.remove(listener);
  }
  
  void _notifyListeners() {
    for (final listener in _listeners) {
      listener();
    }
    notifyListeners();
  }
  
  // Synchronize with external services
  Future<void> syncWithServer() async {
    try {
      final response = await ApiService.getState();
      _state.addAll(response);
      _notifyListeners();
    } catch (e) {
      print('Failed to sync with server: \$e');
    }
  }
  
  Future<void> syncToServer() async {
    try {
      await ApiService.updateState(_state);
    } catch (e) {
      print('Failed to sync to server: \$e');
    }
  }
}

// Usage with multiple widgets
class WidgetA extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Consumer<SynchronizedStateManager>(
      builder: (context, stateManager, child) {
        final value = stateManager.getState<String>('key');
        return Text(value ?? 'No value');
      },
    );
  }
}

class WidgetB extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Consumer<SynchronizedStateManager>(
      builder: (context, stateManager, child) {
        return ElevatedButton(
          onPressed: () => stateManager.setState('key', 'new value'),
          child: Text('Update State'),
        );
      },
    );
  }
}
\`\`\`

## 19.4 Testing Advanced State Management

Testing complex state management requires careful planning and mocking.

\`\`\`dart
import 'package:flutter_test/flutter_test.dart';
import 'package:mockito/mockito.dart';

class MockApiService extends Mock implements ApiService {}

void main() {
  group('Advanced State Management Tests', () {
    late SynchronizedStateManager stateManager;
    late MockApiService mockApiService;
    
    setUp(() {
      stateManager = SynchronizedStateManager();
      mockApiService = MockApiService();
    });
    
    test('should update state and notify listeners', () {
      // Arrange
      bool listenerCalled = false;
      stateManager.addListener(() => listenerCalled = true);
      
      // Act
      stateManager.setState('test_key', 'test_value');
      
      // Assert
      expect(stateManager.getState<String>('test_key'), equals('test_value'));
      expect(listenerCalled, isTrue);
    });
    
    test('should sync with server successfully', () async {
      // Arrange
      when(mockApiService.getState()).thenAnswer((_) async => {
        'server_key': 'server_value'
      });
      
      // Act
      await stateManager.syncWithServer();
      
      // Assert
      expect(stateManager.getState<String>('server_key'), equals('server_value'));
      verify(mockApiService.getState()).called(1);
    });
    
    test('should handle sync errors gracefully', () async {
      // Arrange
      when(mockApiService.getState()).thenThrow(Exception('Network error'));
      
      // Act & Assert
      expect(() => stateManager.syncWithServer(), returnsNormally);
    });
  });
}

// Integration test
void main() {
  group('State Management Integration Tests', () {
    testWidgets('should update UI when state changes', (WidgetTester tester) async {
      // Arrange
      final stateManager = SynchronizedStateManager();
      
      // Act
      await tester.pumpWidget(
        ChangeNotifierProvider.value(
          value: stateManager,
          child: MaterialApp(
            home: Consumer<SynchronizedStateManager>(
              builder: (context, state, child) {
                return Text(state.getState<String>('key') ?? 'No value');
              },
            ),
          ),
        ),
      );
      
      // Assert initial state
      expect(find.text('No value'), findsOneWidget);
      
      // Act - update state
      stateManager.setState('key', 'Updated value');
      await tester.pump();
      
      // Assert updated state
      expect(find.text('Updated value'), findsOneWidget);
    });
  });
}
\`\`\`

Advanced state management patterns enable you to build complex, maintainable applications that scale effectively with your user base and feature requirements.
          `
        }
      ]
    }
  ]
};

// Helper functions for navigation and content management
export const getPartById = (partId) => {
  return bookData.parts.find(part => part.id === parseInt(partId));
};

export const getChapterById = (chapterId) => {
  for (const part of bookData.parts) {
    const chapter = part.chapters.find(chapter => chapter.id === parseInt(chapterId));
    if (chapter) {
      return { ...chapter, partId: part.id };
    }
  }
  return null;
};

export const getAllChapters = () => {
  return bookData.parts.flatMap(part => 
    part.chapters.map(chapter => ({ ...chapter, partId: part.id }))
  );
};

export const getNextChapter = (currentChapterId) => {
  const allChapters = getAllChapters();
  const currentIndex = allChapters.findIndex(chapter => chapter.id === parseInt(currentChapterId));
  return currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null;
};

export const getPreviousChapter = (currentChapterId) => {
  const allChapters = getAllChapters();
  const currentIndex = allChapters.findIndex(chapter => chapter.id === parseInt(currentChapterId));
  return currentIndex > 0 ? allChapters[currentIndex - 1] : null;
};

