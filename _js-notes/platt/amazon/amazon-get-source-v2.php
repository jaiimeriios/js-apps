<?
//use this file to get content from another website
//the raw data is sent back to the AJAX request as text
//in a line of code that looks like this: myData = xmlhttp.responseText;
$query = "britney spears";
$contents = "";
if (!empty($_GET["q"])){
	$query = trim($_GET["q"]);//could be a URL or search terms
}
$query = urlencode($query);
$filename = preg_replace('/[^a-zA-Z0-9]/', '', $query);//only allow alphanumeric chars
$filename .= ".html";

if (file_exists($filename)){
	$contents = file_get_contents($filename);
	echo "<br/><br/><h1>Cached<br/>Content</h1>";
} else {
	if (substr_count($query, 'amazon.com')){// it's an amazon.com URL
		$contents = file_get_contents("http://" . $query);
	} else {// it's a search string
		$query = urlencode($query);
		$contents = file_get_contents("http://www.amazon.com/s/?field-keywords={$query}");
	}
	file_put_contents($filename,$contents);
	echo "<br/><br/><h1>Fresh<br/>Content</h1>";
}

echo $contents;
?>