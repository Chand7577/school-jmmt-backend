<?php
/**
 * Database Configuration
 * 
 * Supports both local development (XAMPP) and cloud environments (Render, Aiven, TiDB).
 * Reads environment variables first, falling back to local defaults.
 */

define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
define('DB_PORT', getenv('DB_PORT') ?: '3306');
define('DB_NAME', getenv('DB_NAME') ?: 'school_admin');
define('DB_USER', getenv('DB_USER') ?: 'root');
define('DB_PASS', getenv('DB_PASS') !== false ? getenv('DB_PASS') : '');
define('DB_CHARSET', 'utf8mb4');
define('DB_SOCKET', getenv('DB_SOCKET') ?: '');

class Database {
    private $host = DB_HOST;
    private $port = DB_PORT;
    private $dbname = DB_NAME;
    private $username = DB_USER;
    private $password = DB_PASS;
    private $charset = DB_CHARSET;
    private $connection = null;

    public function connect() {
        if ($this->connection === null) {
            try {
                // If on local Mac XAMPP with a socket defined and existing
                if (!empty(DB_SOCKET) && file_exists(DB_SOCKET)) {
                    $dsn = "mysql:host={$this->host};dbname={$this->dbname};charset={$this->charset};unix_socket=" . DB_SOCKET;
                } else {
                    $dsn = "mysql:host={$this->host};port={$this->port};dbname={$this->dbname};charset={$this->charset}";
                }

                $options = [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false,
                    PDO::ATTR_TIMEOUT => 10,
                ];

                // TiDB Cloud and cloud MySQL providers require SSL on non-standard ports (e.g., 4000)
                $caCerts = [
                    '/etc/ssl/certs/ca-certificates.crt', // Debian/Ubuntu (Docker on Render)
                    '/etc/pki/tls/certs/ca-bundle.crt',   // RedHat/CentOS
                ];
                foreach ($caCerts as $ca) {
                    if (file_exists($ca)) {
                        $options[PDO::MYSQL_ATTR_SSL_CA] = $ca;
                        break;
                    }
                }
                // Fallback: allow SSL connection without strict cert verification if CA file path is custom
                if (!isset($options[PDO::MYSQL_ATTR_SSL_CA]) && $this->port == 4000) {
                    $options[PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT] = false;
                }
                
                $this->connection = new PDO($dsn, $this->username, $this->password, $options);
                $this->connection->exec("SET NAMES {$this->charset}");
            } catch (PDOException $e) {
                error_log("Database connection failed: " . $e->getMessage());
                // Do not crash the entire payment creation if DB fails; allow transaction to attempt
                throw new Exception("Database connection failed: " . $e->getMessage());
            }
        }
        
        return $this->connection;
    }

    public function close() {
        $this->connection = null;
    }
}

function getDbConnection() {
    $database = new Database();
    return $database->connect();
}

function executeQuery($pdo, $sql, $params = []) {
    try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        return $stmt;
    } catch (PDOException $e) {
        error_log("Query execution failed: " . $e->getMessage());
        throw new Exception("Database query failed: " . $e->getMessage());
    }
}
?>