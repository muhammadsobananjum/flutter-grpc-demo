@echo off

REM Generate the JavaScript and TypeScript files from the proto file
node ./node_modules/.bin/grpc_tools_node_protoc \
  --js_out=import_style=commonjs,binary:./src/proto \
  --grpc_out=./src/proto \
  --plugin=protoc-gen-grpc=./node_modules/.bin/grpc_tools_node_protoc_plugin \
  --ts_out=./src/proto \
  ./protos/user.proto

REM Rename the generated files to use camelCase instead of snake_case
for %%f in (./src/proto/*_pb.js) do (
    ren "%%f" "%%~nf_pb.js"
)
for %%g in (./src/proto/*_grpc_pb.js) do (
    ren "%%g" "%%~ng_grpc_pb.js"
)
