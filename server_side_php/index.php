<?php
	include("func.php");

	$action = (isset($_GET["action"])) ? (empty($_GET["action"]) ? "list" : $_GET["action"]) : "list";

	switch ($action) {
		case 'list':
			get_list();
			break;
		case 'add':
			add_data();
			break;
		case 'edit':
			edit_data();
			break;
		case 'delete':
			delete_data();
			break;

		default:
			get_list();
			break;
	}

	function get_list()
	{
		$data = query_get("SELECT * FROM contact ORDER BY id DESC");

		if (count($data) > 0) {
		    $response = array(
		    	"success" 	=> true,
		    	"data" 		=> $data,
		    	"count" 	=> count($data)
		    );

		    echo json_encode($response);
		    exit;
		} else {
		    $response = array(
		    	"success" 	=> true,
		    	"data" 		=> [],
		    	"count" 	=> 0
		    );

		    echo json_encode($response);
		    exit;
		}
	}

	function add_data()
	{
		$rawData = file_get_contents('php://input');
		$data = json_decode($rawData);

		$name = db()->real_escape_string($data->name);
		$phone = db()->real_escape_string($data->phone);
		$description = db()->real_escape_string($data->description);
		$created = date("Y-m-d H:i:s");

		$sql = "INSERT INTO contact (name, phone, description, created) VALUES ('$name', '$phone', '$description', '$created')";
    	query_raw($sql);
    	
    	$response = array(
    		'success' => true,
    		'message' => "Data has been saved!"
    	);

    	echo json_encode($response);
		exit;
	}

	function edit_data()
	{
		$rawData = file_get_contents('php://input');
		$data = json_decode($rawData);

		$id = db()->real_escape_string($data->id);
		$name = db()->real_escape_string($data->name);
		$phone = db()->real_escape_string($data->phone);
		$description = db()->real_escape_string($data->description);
		$updated = date("Y-m-d H:i:s");

		$sql = "UPDATE contact SET name='$name', phone='$phone', description='$description', updated='$updated'  WHERE id='$id'";
    	query_raw($sql);
    	
    	$response = array(
    		'success' => true,
    		'message' => "Data has been updated!"
    	);

    	echo json_encode($response);
    	exit;
	}

	function delete_data()
	{
		$rawData = file_get_contents('php://input');
		$data = json_decode($rawData);

		$id = db()->real_escape_string($data->id);

		$sql = "DELETE FROM contact WHERE id='$id'";
		query_raw($sql);

		$response = array(
    		'success' => true,
    		'message' => "Data has been deleted!"
    	);

    	echo json_encode($response);
    	exit;
	}

