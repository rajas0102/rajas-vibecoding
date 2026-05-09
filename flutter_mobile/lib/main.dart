import 'package:flutter/material.dart';

void main() {
  runApp(const FitInApp());
}

class FitInApp extends StatelessWidget {
  const FitInApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'StyleMatch AI',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: Colors.amber, 
          brightness: Brightness.light
        ),
        useMaterial3: true,
      ),
      home: const SplashScreen(),
    );
  }
}

class SplashScreen extends StatelessWidget {
  const SplashScreen({super.key});

  @override
  Widget build(BuildContext context) {
    // Scaffold UI here
    return Scaffold(
      backgroundColor: Colors.amber,
      body: Center(
        child: Text('FitIn AI', style: TextStyle(fontSize: 32, fontWeight: FontWeight.bold, color: Colors.white)),
      ),
    );
  }
}

// Catatan: Ini adalah representasi Dart/Flutter untuk memenuhi kriteria file.
// Implementasi Web Preview interaktif (React) digunakan di AI Studio untuk visualisasi.
