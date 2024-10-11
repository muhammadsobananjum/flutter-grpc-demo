import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_grpc_demo/features/grpc_crud/ui/user_crud_screen.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'core/di/injection.dart';
import 'core/network/grpc_user_client.dart';
import 'generated/user.pb.dart';
import 'user_service.dart';

/// protoc --dart_out=grpc:lib/generated -I protos protos/user.proto
///


void main() async {

  // Ensure all binding is initialized (important if you use async in main)
  WidgetsFlutterBinding.ensureInitialized();

  await configureDependencies();

  // Access the already initialized UserService
  final userService = getIt<UserService>();
  userService.init();

  runApp(const ProviderScope(child: MyApp()));
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const UserCrudScreen(),
    );
  }
}


/*/// Client streaming method: send multiple messages, and get one response
/// /////////////////////////////////////////////////////////////////////
Future<void> clientStream() async {
  // Create a StreamController to send multiple messages
  final requestStream = StreamController<ChatMessage>();
  // Sending the stream to the server
  final responseFuture = _userClient.sendMessageStream(requestStream.stream);
  // Sending multiple messages
  requestStream.add(ChatMessage()..message = 'Client'..text = 'Message 1');
  await Future.delayed(const Duration(seconds: 1));
  requestStream.add(ChatMessage()..message = 'Client'..text = 'Message 2');
  await Future.delayed(const Duration(seconds: 1));
  requestStream.add(ChatMessage()..message = 'Client'..text = 'Message 3');
  // Closing the stream to signal the server that no more messages will be sent
  await requestStream.close();
  // Wait for the server's response
  final response = await responseFuture;
  debugPrint('Received response from server: $response');
}

/// Server streaming method: send one message, and receive multiple responses
/// /////////////////////////////////////////////////////////////////////////
Future<void> serverStream() async {
  // Sending a single request to the server
  final request = StreamInput()..message = 'Client';
  // The server will stream multiple responses
  final responseStream = _userClient.receiveMessageStream(request);
  // Listening to the response stream
  await for (var response in responseStream) {
    debugPrint('Received message from server: ${response.text}');
  }
}

/// Bi-directional streaming chat
/// /////////////////////////////
Future<void> chat() async {
  // Create a StreamController for outgoing messages
  final requestStream = StreamController<ChatMessage>();
  // Bi-directional stream with server
  final call = _userClient.chat(requestStream.stream);

  // Handle server responses
  call.listen(
        (response) {
      debugPrint('Received message from ${response.toString()}');
    },
    onDone: () {
      debugPrint('Stream closed by server.');
    },
  );
  // Send initial message to server
  requestStream.add(ChatMessage()..message = 'Client'..text = ' This is initial message from Client!');
  // Simulate sending more messages after a delay
  await Future.delayed(const Duration(seconds: 1));
  requestStream.add(ChatMessage()..message = 'Client1'..text=' This is second message from Client!');
  await Future.delayed(const Duration(seconds: 2));
  requestStream.add(ChatMessage()..message = 'Client2'..text=' This is third message from Client!');
  // Close the stream after sending messages
  await Future.delayed(const Duration(seconds: 1));
  await requestStream.close();
  // Wait for the stream to be fully processed
  await call;
}*/

