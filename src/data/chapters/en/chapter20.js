// Chapter 20: Practical Problem-Solving Scenarios
export function getChapter20Content() {
  return {
    id: 20,
    partId: 3,
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
  };
} 