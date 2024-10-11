//
// import 'dart:async';
//
// import 'package:grpc/grpc.dart';
// import 'generated/user.pbgrpc.dart';
//
// class UserService {
//
//   // Url by ngrok
//   String baseUrl = "0.tcp.in.ngrok.io";
//
//   UserService._internal();
//   static final UserService _instance = UserService._internal();
//
//   factory UserService() => _instance;
//
//   ///static UserService instance that we will call when we want to make requests
//   static UserService get instance => _instance;
//   ///UserClient is the  class that was generated for us when we ran the generation command
//   ///We will pass a channel to it to intialize it
//   late UserServiceClient _userClient;
//
//   ///this will be used to create a channel once we create this class.
//   ///Call UserService().init() before making any call.
//   Future<void> init() async {
//     _createChannel();
//   }
//
//   ///provide public access to the UserClient instance
//   UserServiceClient get userClient {
//     return _userClient;
//   }
//
//   ///here we create a channel and use it to initialize the UserClient that was generated
//   _createChannel() {
//     final channel = ClientChannel(
//       baseUrl,
//       /// ngrok port
//       port: 12607,
//       ///use credentials: ChannelCredentials.insecure() if you want to connect without Tls
//       options: const ChannelOptions(credentials: ChannelCredentials.insecure()),
//     );
//     _userClient = UserServiceClient(channel);
//   }
// }