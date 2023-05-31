function onOpen() {
  const customMenu = SpreadsheetApp.getUi()
  customMenu.createMenu('カスタムメニュー')　//メニューバーに表示するカスタムメニュー名
      .addItem('追加メニューアイテム1', 'functionName')　//メニューアイテムを追加
      .addToUi()
}