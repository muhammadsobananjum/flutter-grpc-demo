// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.0
//   protoc               v5.28.2
// source: protos/user.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import {
  type CallOptions,
  ChannelCredentials,
  Client,
  ClientDuplexStream,
  type ClientOptions,
  ClientReadableStream,
  type ClientUnaryCall,
  ClientWritableStream,
  handleBidiStreamingCall,
  handleClientStreamingCall,
  handleServerStreamingCall,
  type handleUnaryCall,
  makeGenericClientConstructor,
  Metadata,
  type ServiceError,
  type UntypedServiceImplementation,
} from "@grpc/grpc-js";

export const protobufPackage = "user";

export interface StreamInput {
  message: string;
}

export interface StreamOutput {
  message: string;
}

export interface ChatMessage {
  message: string;
  text: string;
}

export interface GeneralResponse {
  message: string;
}

/** Request and response for RegisterUser */
export interface RegisterUserRequest {
  username: string;
  password: string;
  isActive: boolean;
}

export interface RegisterUserResponse {
  message: string;
}

/** Request and response for LoginUser */
export interface LoginUserRequest {
  username: string;
  password: string;
}

/** Response for GetAllUsers */
export interface GetAllUsersResponse {
  users: User[];
}

/** User message */
export interface User {
  id: string;
  username: string;
  password: string;
  isActive: boolean;
}

/** Empty message for GetAllUsers request */
export interface Empty {
}

function createBaseStreamInput(): StreamInput {
  return { message: "" };
}

export const StreamInput: MessageFns<StreamInput> = {
  encode(message: StreamInput, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.message !== "") {
      writer.uint32(10).string(message.message);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): StreamInput {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.message = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StreamInput {
    return { message: isSet(object.message) ? globalThis.String(object.message) : "" };
  },

  toJSON(message: StreamInput): unknown {
    const obj: any = {};
    if (message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StreamInput>, I>>(base?: I): StreamInput {
    return StreamInput.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StreamInput>, I>>(object: I): StreamInput {
    const message = createBaseStreamInput();
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseStreamOutput(): StreamOutput {
  return { message: "" };
}

export const StreamOutput: MessageFns<StreamOutput> = {
  encode(message: StreamOutput, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.message !== "") {
      writer.uint32(10).string(message.message);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): StreamOutput {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamOutput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.message = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StreamOutput {
    return { message: isSet(object.message) ? globalThis.String(object.message) : "" };
  },

  toJSON(message: StreamOutput): unknown {
    const obj: any = {};
    if (message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StreamOutput>, I>>(base?: I): StreamOutput {
    return StreamOutput.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StreamOutput>, I>>(object: I): StreamOutput {
    const message = createBaseStreamOutput();
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseChatMessage(): ChatMessage {
  return { message: "", text: "" };
}

export const ChatMessage: MessageFns<ChatMessage> = {
  encode(message: ChatMessage, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.message !== "") {
      writer.uint32(10).string(message.message);
    }
    if (message.text !== "") {
      writer.uint32(18).string(message.text);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): ChatMessage {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChatMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.message = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.text = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ChatMessage {
    return {
      message: isSet(object.message) ? globalThis.String(object.message) : "",
      text: isSet(object.text) ? globalThis.String(object.text) : "",
    };
  },

  toJSON(message: ChatMessage): unknown {
    const obj: any = {};
    if (message.message !== "") {
      obj.message = message.message;
    }
    if (message.text !== "") {
      obj.text = message.text;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ChatMessage>, I>>(base?: I): ChatMessage {
    return ChatMessage.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ChatMessage>, I>>(object: I): ChatMessage {
    const message = createBaseChatMessage();
    message.message = object.message ?? "";
    message.text = object.text ?? "";
    return message;
  },
};

function createBaseGeneralResponse(): GeneralResponse {
  return { message: "" };
}

export const GeneralResponse: MessageFns<GeneralResponse> = {
  encode(message: GeneralResponse, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.message !== "") {
      writer.uint32(10).string(message.message);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): GeneralResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGeneralResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.message = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GeneralResponse {
    return { message: isSet(object.message) ? globalThis.String(object.message) : "" };
  },

  toJSON(message: GeneralResponse): unknown {
    const obj: any = {};
    if (message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GeneralResponse>, I>>(base?: I): GeneralResponse {
    return GeneralResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GeneralResponse>, I>>(object: I): GeneralResponse {
    const message = createBaseGeneralResponse();
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseRegisterUserRequest(): RegisterUserRequest {
  return { username: "", password: "", isActive: false };
}

export const RegisterUserRequest: MessageFns<RegisterUserRequest> = {
  encode(message: RegisterUserRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.username !== "") {
      writer.uint32(10).string(message.username);
    }
    if (message.password !== "") {
      writer.uint32(18).string(message.password);
    }
    if (message.isActive !== false) {
      writer.uint32(24).bool(message.isActive);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): RegisterUserRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegisterUserRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.username = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.password = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.isActive = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RegisterUserRequest {
    return {
      username: isSet(object.username) ? globalThis.String(object.username) : "",
      password: isSet(object.password) ? globalThis.String(object.password) : "",
      isActive: isSet(object.isActive) ? globalThis.Boolean(object.isActive) : false,
    };
  },

  toJSON(message: RegisterUserRequest): unknown {
    const obj: any = {};
    if (message.username !== "") {
      obj.username = message.username;
    }
    if (message.password !== "") {
      obj.password = message.password;
    }
    if (message.isActive !== false) {
      obj.isActive = message.isActive;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RegisterUserRequest>, I>>(base?: I): RegisterUserRequest {
    return RegisterUserRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RegisterUserRequest>, I>>(object: I): RegisterUserRequest {
    const message = createBaseRegisterUserRequest();
    message.username = object.username ?? "";
    message.password = object.password ?? "";
    message.isActive = object.isActive ?? false;
    return message;
  },
};

function createBaseRegisterUserResponse(): RegisterUserResponse {
  return { message: "" };
}

export const RegisterUserResponse: MessageFns<RegisterUserResponse> = {
  encode(message: RegisterUserResponse, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.message !== "") {
      writer.uint32(10).string(message.message);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): RegisterUserResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegisterUserResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.message = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RegisterUserResponse {
    return { message: isSet(object.message) ? globalThis.String(object.message) : "" };
  },

  toJSON(message: RegisterUserResponse): unknown {
    const obj: any = {};
    if (message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RegisterUserResponse>, I>>(base?: I): RegisterUserResponse {
    return RegisterUserResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RegisterUserResponse>, I>>(object: I): RegisterUserResponse {
    const message = createBaseRegisterUserResponse();
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseLoginUserRequest(): LoginUserRequest {
  return { username: "", password: "" };
}

export const LoginUserRequest: MessageFns<LoginUserRequest> = {
  encode(message: LoginUserRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.username !== "") {
      writer.uint32(10).string(message.username);
    }
    if (message.password !== "") {
      writer.uint32(18).string(message.password);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): LoginUserRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLoginUserRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.username = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.password = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LoginUserRequest {
    return {
      username: isSet(object.username) ? globalThis.String(object.username) : "",
      password: isSet(object.password) ? globalThis.String(object.password) : "",
    };
  },

  toJSON(message: LoginUserRequest): unknown {
    const obj: any = {};
    if (message.username !== "") {
      obj.username = message.username;
    }
    if (message.password !== "") {
      obj.password = message.password;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LoginUserRequest>, I>>(base?: I): LoginUserRequest {
    return LoginUserRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<LoginUserRequest>, I>>(object: I): LoginUserRequest {
    const message = createBaseLoginUserRequest();
    message.username = object.username ?? "";
    message.password = object.password ?? "";
    return message;
  },
};

function createBaseGetAllUsersResponse(): GetAllUsersResponse {
  return { users: [] };
}

export const GetAllUsersResponse: MessageFns<GetAllUsersResponse> = {
  encode(message: GetAllUsersResponse, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    for (const v of message.users) {
      User.encode(v!, writer.uint32(10).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): GetAllUsersResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAllUsersResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.users.push(User.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetAllUsersResponse {
    return { users: globalThis.Array.isArray(object?.users) ? object.users.map((e: any) => User.fromJSON(e)) : [] };
  },

  toJSON(message: GetAllUsersResponse): unknown {
    const obj: any = {};
    if (message.users?.length) {
      obj.users = message.users.map((e) => User.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetAllUsersResponse>, I>>(base?: I): GetAllUsersResponse {
    return GetAllUsersResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetAllUsersResponse>, I>>(object: I): GetAllUsersResponse {
    const message = createBaseGetAllUsersResponse();
    message.users = object.users?.map((e) => User.fromPartial(e)) || [];
    return message;
  },
};

function createBaseUser(): User {
  return { id: "", username: "", password: "", isActive: false };
}

export const User: MessageFns<User> = {
  encode(message: User, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.username !== "") {
      writer.uint32(18).string(message.username);
    }
    if (message.password !== "") {
      writer.uint32(26).string(message.password);
    }
    if (message.isActive !== false) {
      writer.uint32(32).bool(message.isActive);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): User {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.username = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.password = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.isActive = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): User {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      username: isSet(object.username) ? globalThis.String(object.username) : "",
      password: isSet(object.password) ? globalThis.String(object.password) : "",
      isActive: isSet(object.isActive) ? globalThis.Boolean(object.isActive) : false,
    };
  },

  toJSON(message: User): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.username !== "") {
      obj.username = message.username;
    }
    if (message.password !== "") {
      obj.password = message.password;
    }
    if (message.isActive !== false) {
      obj.isActive = message.isActive;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<User>, I>>(base?: I): User {
    return User.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<User>, I>>(object: I): User {
    const message = createBaseUser();
    message.id = object.id ?? "";
    message.username = object.username ?? "";
    message.password = object.password ?? "";
    message.isActive = object.isActive ?? false;
    return message;
  },
};

function createBaseEmpty(): Empty {
  return {};
}

export const Empty: MessageFns<Empty> = {
  encode(_: Empty, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): Empty {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEmpty();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): Empty {
    return {};
  },

  toJSON(_: Empty): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<Empty>, I>>(base?: I): Empty {
    return Empty.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Empty>, I>>(_: I): Empty {
    const message = createBaseEmpty();
    return message;
  },
};

/** Define the gRPC service */
export type UserServiceService = typeof UserServiceService;
export const UserServiceService = {
  registerUser: {
    path: "/user.UserService/RegisterUser",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: RegisterUserRequest) => Buffer.from(RegisterUserRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => RegisterUserRequest.decode(value),
    responseSerialize: (value: RegisterUserResponse) => Buffer.from(RegisterUserResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => RegisterUserResponse.decode(value),
  },
  deleteUser: {
    path: "/user.UserService/DeleteUser",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: User) => Buffer.from(User.encode(value).finish()),
    requestDeserialize: (value: Buffer) => User.decode(value),
    responseSerialize: (value: GeneralResponse) => Buffer.from(GeneralResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => GeneralResponse.decode(value),
  },
  updateUser: {
    path: "/user.UserService/UpdateUser",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: User) => Buffer.from(User.encode(value).finish()),
    requestDeserialize: (value: Buffer) => User.decode(value),
    responseSerialize: (value: GeneralResponse) => Buffer.from(GeneralResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => GeneralResponse.decode(value),
  },
  getAllUsers: {
    path: "/user.UserService/GetAllUsers",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: Empty) => Buffer.from(Empty.encode(value).finish()),
    requestDeserialize: (value: Buffer) => Empty.decode(value),
    responseSerialize: (value: GetAllUsersResponse) => Buffer.from(GetAllUsersResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => GetAllUsersResponse.decode(value),
  },
  /** server-stream */
  receiveMessageStream: {
    path: "/user.UserService/ReceiveMessageStream",
    requestStream: false,
    responseStream: true,
    requestSerialize: (value: StreamInput) => Buffer.from(StreamInput.encode(value).finish()),
    requestDeserialize: (value: Buffer) => StreamInput.decode(value),
    responseSerialize: (value: ChatMessage) => Buffer.from(ChatMessage.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ChatMessage.decode(value),
  },
  /** client-stream */
  sendMessageStream: {
    path: "/user.UserService/SendMessageStream",
    requestStream: true,
    responseStream: false,
    requestSerialize: (value: ChatMessage) => Buffer.from(ChatMessage.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ChatMessage.decode(value),
    responseSerialize: (value: StreamOutput) => Buffer.from(StreamOutput.encode(value).finish()),
    responseDeserialize: (value: Buffer) => StreamOutput.decode(value),
  },
  /** bi directional */
  chat: {
    path: "/user.UserService/Chat",
    requestStream: true,
    responseStream: true,
    requestSerialize: (value: ChatMessage) => Buffer.from(ChatMessage.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ChatMessage.decode(value),
    responseSerialize: (value: ChatMessage) => Buffer.from(ChatMessage.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ChatMessage.decode(value),
  },
} as const;

export interface UserServiceServer extends UntypedServiceImplementation {
  registerUser: handleUnaryCall<RegisterUserRequest, RegisterUserResponse>;
  deleteUser: handleUnaryCall<User, GeneralResponse>;
  updateUser: handleUnaryCall<User, GeneralResponse>;
  getAllUsers: handleUnaryCall<Empty, GetAllUsersResponse>;
  /** server-stream */
  receiveMessageStream: handleServerStreamingCall<StreamInput, ChatMessage>;
  /** client-stream */
  sendMessageStream: handleClientStreamingCall<ChatMessage, StreamOutput>;
  /** bi directional */
  chat: handleBidiStreamingCall<ChatMessage, ChatMessage>;
}

export interface UserServiceClient extends Client {
  registerUser(
    request: RegisterUserRequest,
    callback: (error: ServiceError | null, response: RegisterUserResponse) => void,
  ): ClientUnaryCall;
  registerUser(
    request: RegisterUserRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: RegisterUserResponse) => void,
  ): ClientUnaryCall;
  registerUser(
    request: RegisterUserRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: RegisterUserResponse) => void,
  ): ClientUnaryCall;
  deleteUser(request: User, callback: (error: ServiceError | null, response: GeneralResponse) => void): ClientUnaryCall;
  deleteUser(
    request: User,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: GeneralResponse) => void,
  ): ClientUnaryCall;
  deleteUser(
    request: User,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: GeneralResponse) => void,
  ): ClientUnaryCall;
  updateUser(request: User, callback: (error: ServiceError | null, response: GeneralResponse) => void): ClientUnaryCall;
  updateUser(
    request: User,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: GeneralResponse) => void,
  ): ClientUnaryCall;
  updateUser(
    request: User,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: GeneralResponse) => void,
  ): ClientUnaryCall;
  getAllUsers(
    request: Empty,
    callback: (error: ServiceError | null, response: GetAllUsersResponse) => void,
  ): ClientUnaryCall;
  getAllUsers(
    request: Empty,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: GetAllUsersResponse) => void,
  ): ClientUnaryCall;
  getAllUsers(
    request: Empty,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: GetAllUsersResponse) => void,
  ): ClientUnaryCall;
  /** server-stream */
  receiveMessageStream(request: StreamInput, options?: Partial<CallOptions>): ClientReadableStream<ChatMessage>;
  receiveMessageStream(
    request: StreamInput,
    metadata?: Metadata,
    options?: Partial<CallOptions>,
  ): ClientReadableStream<ChatMessage>;
  /** client-stream */
  sendMessageStream(
    callback: (error: ServiceError | null, response: StreamOutput) => void,
  ): ClientWritableStream<ChatMessage>;
  sendMessageStream(
    metadata: Metadata,
    callback: (error: ServiceError | null, response: StreamOutput) => void,
  ): ClientWritableStream<ChatMessage>;
  sendMessageStream(
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: StreamOutput) => void,
  ): ClientWritableStream<ChatMessage>;
  sendMessageStream(
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: StreamOutput) => void,
  ): ClientWritableStream<ChatMessage>;
  /** bi directional */
  chat(): ClientDuplexStream<ChatMessage, ChatMessage>;
  chat(options: Partial<CallOptions>): ClientDuplexStream<ChatMessage, ChatMessage>;
  chat(metadata: Metadata, options?: Partial<CallOptions>): ClientDuplexStream<ChatMessage, ChatMessage>;
}

export const UserServiceClient = makeGenericClientConstructor(UserServiceService, "user.UserService") as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): UserServiceClient;
  service: typeof UserServiceService;
  serviceName: string;
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export interface MessageFns<T> {
  encode(message: T, writer?: BinaryWriter): BinaryWriter;
  decode(input: BinaryReader | Uint8Array, length?: number): T;
  fromJSON(object: any): T;
  toJSON(message: T): unknown;
  create<I extends Exact<DeepPartial<T>, I>>(base?: I): T;
  fromPartial<I extends Exact<DeepPartial<T>, I>>(object: I): T;
}
