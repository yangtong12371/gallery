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

function getRangeRandom(low, high) {
	return Math.ceil(Math.random()*(high - low) + low);
}

class ImgFigure extends React.Component {
	render() {

		var styleObject = {};
		if(this.props.arrange.pos) {
			styleObject = this.props.arrange.pos;
		}

		return (
			<figure className="img-figure">
				<img src={this.props.data.imageUrl}
					alt={this.props.data.title}
				/>
				<figcaption>
					<h2 className="img-title">{this.props.data.title}</h2>
				</figcaption>
			</figure>
		);
	}
}

class AppComponent extends React.Component {

	Constant: {
		centerPosition: {
			left:0,
			right:0
		},
		hPositionRange: {
			leftSexX: [0,0],
			rightSecX: [0,0],
			y:[0,0]
		},
		vPostitionRange: {
			x:[0,0],
			topY:[0,0]
		}
	};

	rearrange: function (centerIndex) {
		var imgsArrangeArr = this.state.imgsArrangeArr,
			Constant = this.Constant,
			centerPos = Constant.centerPosition,
			hPosRange = Constant.hPositionRange,
			vPosRange = Constant.vPostitionRange,
			hPositionRangeLeftSecX = hPositionRange.leftSexX,
			hPositionRangeRightSecX = hPositionRange.rightSecX,
			hPositionRangeY = hPositionRange.y,

			vPostitionRangeTopY = vPostitionRange.topY,
			vPostitionRangeX = vPostitionRange.x,

			imgsArrangeTopArr = [],

			topImgNum = Math.ceil(Math.random()*2),

			topImgSpliceIndex = 0,

			imgsArrageCenterArr = imgsArrangeArr.splice(centerIndex,1);

			imgsArrageCenterArr[0].pos = centerPos;

			topImgSpliceIndex = Math.ceil(Math.random()*(imgsArrangeArr.length - topImgNum));

			imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

			imgsArrangeTopArr.forEach(function(value, index)) {
				imgsArrangeTopArr[index].pos = {
					top: getRangeRandom(vPostitionRangeTopY[0],vPostitionRangeTopY[1]),
					left: getRangeRandom(vPostitionRangeX[0],vPostitionRangeX[1])
				}
			};

			for(var i = 0 , j < imgsArrangeArr.length, k = j/2;i<j;i++) {
				var h = null;
				if(i < k) {
					h = hPositionRangeLeftSecX;
				} else {
					h = hPositionRangeRightSecX;
				}

				imgsArrangeArr[i].pos = {
					top: getRangeRandom(hPositionRangeY[0], hPositionRangeY[1]),
					left: getRangeRandom(h[0], h[1])
				}
			}

			if(imgsArrangeTopArr && imgsArrangeTopArr[0]) {
				imgsArrangeArr.splice(topImgSpliceIndex,0,imgsArrangeTopArr[0]);
			}

			imgsArrangeArr.splice(centerIndex, 0 , imgsArrageCenterArr[0]);

			this.setState({
				imgsArrangeArr:imgsArrangeArr
			});
	},

	getInitialState: function() {
		return {
			imgsArrangeArr : [
				// {
				// 	pos: 
				// }
			]
		}
	},

	// 组件加载 随机位置
	componentDidMount: function() {
		var stageDOM = React.findDOMNode(this.ref.state),
		stageW = stageDOM.scrollWidth,
		stageH = stageDOM.scrollHeight,
		halfStageW = Math.ceil(stageW/2),
		halfStageH = Math.ceil(stageH/2);

		var imgFigureDOM. = React.findDOMNode(this.ref.imgFigure0),
		imgW = imgFigureDOM.scrollWidth,
		imgH = imgFigureDOM.scrollHeight,
		halfImgW = Math.ceil(imgW/2),
		halfImgH = Math.ceil(imgH/2);

		//计算中心图片的位置点
		this.Constant.centerPosition = {
			left:halfStageW - halfImgW,
			right:halfStageH - halfImgH
		}

		this.hPositionRange.leftSexX[0] = -halfImgW;
		this.hPositionRange.leftSexX[1] = halfStageW - halfImgW*3;

		this.hPositionRange.rightSecX[0] = halfStageW + halfImgW;
		this.hPositionRange.rightSecX[1] = stageW - halfImgW;

		this.hPositionRange.y[0] = -halfImgH;
		this.hPositionRange.y[1] = stageH - halfImgH;

		this.vPostitionRange.topY[0] = -halfImgH;
		this.vPostitionRange.topY[1] = halfStageH - halfImgH*3;
		this.vPostitionRange.x[0] = halfImgW - imgW;
		this.vPostitionRange.x[1] = halfImgW;

		this.rearrange(0);
	},

  render() {

  	var controllerUnits = [],
  		imgFigures = [];

  	imageDatas.forEach(function(value, index) {
  		if(!this.stata.imgsArrangeArr[index]) {
  			this.stata.imgsArrangeArr[index]　= {
  				pos: {
  					left : 0,
  					top: 0
  				}
  			}
  		}
  		imgFigures.push(<ImgFigure data={value} ref={'imgFigure'}+index
  			arrange={this.stata.imgsArrangeArr[index]}/>);
  	}).bind(this);

    return (
      <section className="stage" ref="stage">
      	<section className="img-sec">
      		{imgFigures}
      	</section>
      	<nav className="controller-nav">
      		{controllerUnits}
      	</nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
