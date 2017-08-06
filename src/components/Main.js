require('normalize.css/normalize.css');
require('styles/App.scss');


import React from 'react';
/**
获取图片的具体路径信息
**/
let imageDatas = require('../data/imageDatas.json');
imageDatas =(function genImageUrl(imageDatasArray) {
	for (var i = 0; i < imageDatasArray.length; i++) {
		var singleImageDta = imageDatasArray[i];
		singleImageDta.imageUrl = require('../images/' + singleImageDta.fileName);
		imageDatasArray[i] = singleImageDta;
	}
	return imageDatasArray;
})(imageDatas);


class AppComponent extends React.Component {
  render() {
    return (
      <section className="stage">
      	<section className="img-sec">
      	</section>
      	<nav className="controller-nav">
      	</nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
