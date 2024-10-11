import grpc, { ChannelCredentials, Client } from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import { GeneralResponse, GetAllUsersResponse, RegisterUserResponse, StreamInput, StreamOutput, User } from '../generated/protos/user';
import { connectToMySql, queryMySql, disconnectFromMySql } from './database/db.js';


const PROTO_PATH = './protos/user.proto';

// Load the protobuf
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const proto = grpc.loadPackageDefinition(packageDefinition).user as any;

//Define the gRPC server
const server = new grpc.Server();


// Register User
async function registerUser(call: any,  callback: (error: Error | null, response: RegisterUserResponse) => void) {
  const { username, password, is_active } = call.request;
  try {
    await connectToMySql();
    const query = 'INSERT INTO users (username, password, is_active) VALUES (?, ?, ?)';
    const users = await queryMySql(query, [username, password, is_active]);
    disconnectFromMySql();
    console.log('Users:', users);
    const response: RegisterUserResponse = {message:"User Added Sucessfully"};
    // Return the response using the proper gRPC callback
    callback(null, response);
  } catch (error) {
    callback(null, error);
    console.error('Error during database operations:', error);
  }
  
}
// Update User
async function updateUser(call: any, callback: (error: Error | null, response: GeneralResponse) => void) {
  const { id, username, password, is_active } = call.request;
  try {
    await connectToMySql();
    const query = 'UPDATE users SET username = ?, password = ?, is_active = ? WHERE id = ?';
    const result = await queryMySql(query, [username, password, is_active, id]);
    disconnectFromMySql();
    if (result.affectedRows === 0) {
      return callback(new Error('User not found'), null);
    }
    const response: GeneralResponse = {
      message: 'User updated successfully',
    };
    callback(null, response);
  } catch (error) {
    callback(error, null);
    console.error('Error during database operations:', error);
  }
}
// Delete User
async function deleteUser(call: any, callback: (error: Error | null, response: GeneralResponse) => void) {
  const { id } = call.request;
  try {
    await connectToMySql();
    const query = 'DELETE FROM users WHERE id = ?';
    const result = await queryMySql(query, [id]);
    disconnectFromMySql();
    if (result.affectedRows === 0) {
      return callback(new Error('User not found'), null);
    }
    const response: GeneralResponse = {
      message: 'User deleted successfully',
    };
    callback(null, response);
  } catch (error) {
    callback(error, null);
    console.error('Error during database operations:', error);
  }
}

// Get All Users
async function getAllUsers(call: any, callback: (error: Error | null, response: GetAllUsersResponse) => void) {
  try {
    await connectToMySql();
    const query = 'SELECT * FROM users';
    const users = await queryMySql(query);
    disconnectFromMySql();
    console.log('Users:', users);
    const response: GetAllUsersResponse = { users };
    callback(null, response);
  } catch (error) {
    callback(error, null);
    console.error('Error during database operations:', error);
  }
}

// Define the bidirectional streaming service
function chat(call: any) {
  call.on('data', (message: any) => {
    console.log(`Received message from ${message.message}: ${message.text}`);
    call.write({
      message: 'Server',
      text: `Echo: ${message.text}`
    });
  });
  call.on('end', () => {
    call.end(); // End the stream
  });
}

// Client Side Streaming
function sendMessageStream(call: any, callback:  (error: Error | null, response: StreamOutput) => void) {
  let messages = [];

  call.on('data', (message: any) => {
    console.log(`Received message from ${message.message}: ${message.text}`);
    messages.push(message.text);
  });

  call.on('end', () => {
    // Once the stream ends, return a single response.
    const message = `Server received ${messages.length} messages: ${messages.join(', ')}`;

    const response : StreamOutput = { message };
    callback(null, response);
  });
}


function receiveMessageStream(call : any) {
  const { message, text } = call.request;

  console.log(`Received message from ${message}: ${text}`);

  // Simulate server sending a stream of responses
  let count = 0;
  const interval = setInterval(() => {
    if (count < 3) {
      const responseText = `Server response #${count + 1} to ${message}: Hello!`;
      call.write({ text: responseText });
      count++;
    } else {
      clearInterval(interval);
      call.end(); // Close the stream once done
    }
  }, 1000);
}

// Add the service to the server
server.addService(proto.UserService.service, {
  RegisterUser: registerUser,
  GetAllUsers : getAllUsers,
  UpdateUser  : updateUser,
  DeleteUser  : deleteUser,
  Chat        : chat,
  SendMessageStream: sendMessageStream,
  ReceiveMessageStream : receiveMessageStream
  

});

// Start the server
const PORT = '50051';
server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), () => {
  console.log(`Server running on port 0.0.0.0:${PORT}`);

  server.start();

});


//protoc --plugin=protoc-gen-ts_proto="D:\work\grpc-node-api\node_modules\.bin\protoc-gen-ts_proto.cmd" --ts_proto_out=./ --ts_proto_opt=nestJs=true ./proto/user.proto






