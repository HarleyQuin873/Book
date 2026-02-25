<?php
/*METHOD GET AND GET WITH GET ID*/
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 1000");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header("Access-Control-Allow-Methods: PUT,PATCH, POST, GET, OPTIONS, DELETE");
$config = include('config.php');
/*CONN DB*/
$host = $config['db']['host'];
$dbname = $config['db']['dbname'];
$user = $config['db']['user'];
$pass = $config['db']['pass'];


try {
    $dbh = new PDO ("mysql:host = $host;dbname=$dbname", $user, $pass);
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo 'Errore connessione al database !' . $e->getMessage();
    die();
}
/*END CONN DB*/

$json = trim(file_get_contents('php://input'));
$input = json_decode($json, true);
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    if (isset($_GET['id'])) {
        $id = $_GET['id'];
        $stmt = $dbh->prepare("SELECT * FROM book WHERE id = :id");
        $stmt->execute(['id' => $id]);
        echo json_encode($stmt->fetch(PDO::FETCH_ASSOC));
    } else {
        $stmt = $dbh->prepare("SELECT * FROM book");
        $stmt->execute();
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    }
    exit; // importante
}

// --- GESTIONE POST (INSERIMENTO) ---
if ($method === 'POST') {
    $title = $input["title"] ?? '';
    $author = $input["author"] ?? '';
    $price = $input["price"] ?? 0;
    $isbn = $input["isbn"] ?? '';
    $description = $input["description"] ?? '';
    $img = $input["img"] ?? '';

    try {
        $stmt = $dbh->prepare("INSERT INTO book (title, author, price, isbn, description, img) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([$title, $author, $price, $isbn, $description, $img]);
        echo json_encode([
            "success" => true,
            "id" => $dbh->lastInsertId()
        ]);
    } catch (PDOException $e) {
        echo json_encode([
            "success" => false,
            "error" => $e->getMessage()
        ]);
    }
    exit;
}

// --- GESTIONE PATCH (AGGIORNAMENTO) ---
if ($method === 'PATCH') {
    $id = $_GET['id'] ?? 0;
    $title = $input["title"] ?? '';
    $author = $input["author"] ?? '';
    $price = $input["price"] ?? 0;
    $isbn = $input["isbn"] ?? '';
    $description = $input["description"] ?? '';
    $img = $input["img"] ?? '';

    try {
        $stmt = $dbh->prepare("UPDATE book SET title=?, author=?, price=?, isbn=?, description=?, img=? WHERE id=?");
        $stmt->execute([$title, $author, $price, $isbn, $description, $img, $id]);
        echo json_encode(["success" => true]);
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "error" => $e->getMessage()]);
    }
    exit;
}

// --- GESTIONE DELETE ---
if ($method === 'DELETE') {
    $id = $_GET['id'] ?? 0;
    try {
        $stmt = $dbh->prepare("DELETE FROM book WHERE id = :id");
        $stmt->execute(['id' => $id]);
        echo json_encode(["success" => true]);
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "error" => $e->getMessage()]);
    }
    exit;
}

