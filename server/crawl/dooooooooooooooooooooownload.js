import Downloader from "mt-files-downloader";

const url = "http://yanxuan.nosdn.127.net/854638ad9e4446846e7821b2bb31881a.jpg?imageView&quality=95&thumbnail=250x250";
const downloader = new Downloader();
const dl = downloader.download(url, "foo.png");
dl.start();