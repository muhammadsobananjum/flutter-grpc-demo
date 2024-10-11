import mysql, { Connection } from 'mysql';

// MySQL Server configuration
const config = {
  host: '127.0.0.1',      // Replace with your MySQL server host
  user: 'root',           // Replace with your MySQL username
  password: '',   // Replace with your MySQL password
  database: 'grpc_demo2',     // Replace with your MySQL database name
  port:3306
};

// Connect to MySQL Server
let connection: Connection | null = null;

// Connect to MySQL Server
export function connectToMySql(): Promise<Connection> {
  return new Promise((resolve, reject) => {
    if (!connection) {
      connection = mysql.createConnection(config);
      
      connection.connect((err) => {
        if (err) {
          console.error('MySQL Connection Error:', err);
          return reject(err);
        }
        console.log('Connected to MySQL Server');
        resolve(connection);
      });
      
      connection.on('error', (err) => {
        console.error('Database connection error:', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNRESET') {
          console.log('Attempting to reconnect...');
          connection = null;  // Clear the connection to force reconnect on the next call
        }
      });
    } else {
      resolve(connection);
    }
  });
}

// Disconnect from MySQL Server
export function disconnectFromMySql(): void {
  if (connection) {
    connection.end((err) => {
      if (err) {
        console.error('Error disconnecting from MySQL:', err);
      } else {
        console.log('Disconnected from MySQL Server');
      }
    });
    connection = null;
  } else {
    console.log('No active MySQL connection to disconnect.');
  }
}

// Execute a query
export function queryMySql(query: string, values: any[] = []): Promise<any> {
  return new Promise((resolve, reject) => {
    if (!connection) {
      return reject(new Error('No MySQL connection. Call connectToMySql first.'));
    }
    
    connection.query(query, values, (err, results) => {
      if (err) {
        console.error('MySQL Query Error:', err);
        return reject(err);
      }
      resolve(results);
    });
  });
}


//protoc --plugin=protoc-gen-ts_proto="D:\work\grpc-node-api\node_modules\.bin\protoc-gen-ts_proto.cmd" --ts_proto_out=./ --ts_proto_opt=nestJs=true ./proto/user.proto