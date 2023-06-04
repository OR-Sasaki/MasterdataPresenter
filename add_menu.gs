function onOpen() {
  const customMenu = SpreadsheetApp.getUi()
  customMenu.createMenu('カスタムメニュー')　//メニューバーに表示するカスタムメニュー名
      .addItem('追加メニューアイテム1', 'functionName')　//メニューアイテムを追加
      .addToUi()
}

const urlBase = "https://api.github.com/repos/hemuichi/MasterContaints/"
const token = PropertiesService.getScriptProperties().getProperty("gittoken");
var headers = {
  "Accept": "application/vnd.github+json",
  "Authorization": "Bearer " + token
}

function fetchGet(requestUrl)
{
  var requestOptions = {
    "method": "get",
    "headers": headers
  }

  var response = UrlFetchApp.fetch(requestUrl, requestOptions)
  var contentText = response.getContentText()
  Logger.log(">>>>>>>[GET]【" + requestUrl + "】 "+ contentText)
  return(JSON.parse(contentText))
}

function fetchPost(requestUrl, payload = {})
{
  var requestOptions = {
    "method": "post",
    "headers": headers,
    "payload": JSON.stringify(payload),
    "Content-Type": "application/json"
  }

  var response = UrlFetchApp.fetch(requestUrl, requestOptions)
  var contentText = response.getContentText()
  Logger.log(">>>>>>>[POST]【" + requestUrl + "】 " + contentText)
  return(JSON.parse(contentText))
}

function doCommit()
{
  var refSha = getRefSha()
  var commit = getCommit(refSha)
  var blobSha = getBlobSha("hogehoge")

}

function getRefSha()
{
  var requestUrl = urlBase + "git/refs/heads/main"
  var sha = fetchGet(requestUrl)["object"]["sha"]
  Logger.log("getRefSha: " + sha)
  return(sha)
}

function getCommit(sha)
{
  var requestUrl = urlBase + "git/commits/" + sha
  var commit = fetchGet(requestUrl)
  Logger.log("getCommit: " + commit)
}

function getBlobSha(content)
{
  var requestUrl = urlBase + "git/blobs"
  var contentBase64 = Utilities.base64Encode(content)
  var payload = { "content": contentBase64, "encoding": "base64" }
  var blob = fetchPost(requestUrl, payload)
  var sha = blob["sha"]
  Logger.log("getBlobSha: " + sha)
  return(sha)
}

function getTree()
{
  
}

function createTree()
{

}

function createCommit()
{

}

function updateRef()
{

}



