webpackJsonp([27],{693:function(e,a,t){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(a,"__esModule",{value:!0});var n=t(75),s=r(n),d=t(11),i=r(d),l=t(118),o=r(l),u=t(286),c=r(u),p=t(297),f=r(p);t(287);var y=t(280),m=t(177);a.default={namespace:"model",state:{globalVariable:{iteration:1,lr:.01,l2:.002},list:[],loading:!1,model:{},epochs:void 0,batchSize:void 0,self_datasets:[],datasets:[{id:11,type:"conv",dataset:"mnist",name:"MNIST",amount:6e4,description:"consists of images of handwritten digits. \nMNIST is a classic problem in machine learning. The problem is to look at greyscale 28x28 pixel images of handwritten digits and determine which digit the image represents, for all the digits from zero to nine."},{id:1,type:"dense",dataset:"iris",name:"Iris",amount:100,description:"This is perhaps the best known database to be found in the pattern recognition literature. The data set contains 3 classes of 50 instances each, where each class refers to a type of iris plant."},{id:2,type:"conv",dataset:"cifar",name:"Cifar-10",amount:5e4,description:"The CIFAR-10 dataset consists of 60000 32x32 color images in 10 classes, with 6000 images per class."},{id:3,type:"conv",dataset:"emnist-complete",name:"EMNIST ByClass",amount:697932,description:"814,255 characters, and 62 unbalanced classes."},{id:4,type:"conv",dataset:"emnist-merge",name:"EMNIST ByMerge",amount:697932,description:"814,255 characters, and 47 unbalanced classes."},{id:5,type:"conv",dataset:"emnist-balance",name:"EMNIST Balanced",amount:112800,description:"131,600 characters, and 47 balanced classes."},{id:6,type:"conv",dataset:"emnist-letter",name:"EMNIST Letters",amount:88800,description:"1145,600 characters, and 26 balanced classes."},{id:7,type:"conv",dataset:"emnist-digits",name:"EMNIST Digits",amount:24e4,description:"280,000 characters, and 10 balanced classes."},{id:8,type:"conv",dataset:"emnist-mnist",name:"EMNIST MNIST",amount:6e4,description:"70,000 characters, and 10 balanced classes."},{id:9,type:"rnn",amount:54e3,dataset:"shakespeare",name:"Shakespeare",description:"Complete Works of William Shakespeare\nfrom Project Gutenberg"}],layers:[{layerId:0,type:"convolution",ctype:"Convolution Layer",filter:5,kernelSize:3,strides:2,padding:0,activation:"relu"},{type:"dense",layerId:1,ctype:"Dense Layer",outputDim:200,activation:"relu",weightInit:"xavier"},{layerId:2,type:"pooling",ctype:"Pooling Layer",kernelSize:2,strides:2,poolingType:"max"},{layerId:3,type:"dropout",ctype:"Dropout Layer",dropoutRate:.5},{layerId:4,ctype:"Output Layer",type:"output",outputNum:2,activation:"softmax",lossFunction:"neg"},{layerId:5,ctype:"LSTM Layer",type:"lstm",hiddenLayerWidth:200,hiddenLayerCount:3,sequenceLen:200}],cards:[]},effects:{save:o.default.mark(function e(a,t){var r,n,s,d,i,l,u,p=t.call,m=(t.put,t.select);return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m(function(e){return e.model.cards});case 2:return r=e.sent,e.next=5,m(function(e){return e.model.model});case 5:return n=e.sent,e.next=8,m(function(e){return e.model.globalVariable});case 8:if(s=e.sent,n.datasetId){e.next=12;break}return c.default.error({message:"save failed!",description:"no dataset selected."}),e.abrupt("return");case 12:if(d=r.filter(function(e){return 4===e.layerId}),0!==d.length){e.next=18;break}return c.default.error({message:"Layers are invalid!",description:"An output layer is required!"}),e.abrupt("return");case 18:if(!(d.length>1)){e.next=23;break}return c.default.error({message:"Layers are invalid!",description:"Only one output layer in a model!"}),e.abrupt("return");case 23:if(4===r[r.length-1].layerId){e.next=28;break}return c.default.error({message:"Layers are invalid!",description:"The output layer is not the last layer!"}),e.abrupt("return");case 28:if(1!==r.length){e.next=33;break}return c.default.error({message:"Layers are invalid!",description:"You must add layers except output layer!"}),e.abrupt("return");case 33:if(!(r.length>12)){e.next=36;break}return c.default.warning({message:"Layers are invalid!",description:"only VIP users can add so many layers!"}),e.abrupt("return");case 36:return i={userid:parseInt(localStorage.getItem("id"),10),dataset:n.datasetName,layers:r,globalVariable:s},l={id:parseInt(n.id,10),name:n.name,type:n.datasetType,config:(0,f.default)(i),datasetId:n.datasetId,datasetName:n.datasetName},e.next=40,p(y.saveModel,l);case 40:u=e.sent,200===u.code?c.default.success({message:"saved!"}):c.default.error({message:"save failed!"});case 42:case"end":return e.stop()}},e,this)}),dealCard:o.default.mark(function e(a,t){var r=a.payload,n=(t.call,t.put);return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n({type:r.type,payload:r});case 2:case"end":return e.stop()}},e,this)}),run:o.default.mark(function e(a,t){var r=a.payload,n=(t.call,t.put);return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n({type:"setRunConfig",payload:r});case 2:case"end":return e.stop()}},e,this)}),fetch:o.default.mark(function e(a,t){var r,n=a.payload,s=t.call,d=t.put;return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d({type:"changeLoading",payload:!0});case 2:return e.next=4,s(y.queryModelById,n);case 4:if(r=e.sent,r.code&&200===r.code){e.next=10;break}return e.next=8,d(m.routerRedux.push("/404"));case 8:e.next=12;break;case 10:return e.next=12,d({type:"queryModel",payload:r.result});case 12:return e.next=14,d({type:"changeLoading",payload:!1});case 14:case"end":return e.stop()}},e,this)}),fetchDatasets:o.default.mark(function e(a,t){var r,n=(a.payload,t.call),s=t.put;return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s({type:"changeLoading",payload:!0});case 2:return e.next=4,n(y.queryDatasets);case 4:if(r=e.sent,r.code&&200===r.code){e.next=10;break}return e.next=8,s(m.routerRedux.push("/404"));case 8:e.next=12;break;case 10:return e.next=12,s({type:"saveDatasets",payload:Array.isArray(r.result)?r.result:[]});case 12:return e.next=14,s({type:"changeLoading",payload:!1});case 14:case"end":return e.stop()}},e,this)})},reducers:{refreshCards:function(e,a){var t=a.payload;return(0,i.default)({},e,{cards:t})},reverseCardAttr:function(e,a){var t=a.payload,r=t.id,n=t.values,d=[].concat((0,s.default)(e.cards)),l=d.findIndex(function(e){return e.id===r});return console.log("index",l),l>=0&&(d[l]=(0,i.default)({},d[l],n)),(0,i.default)({},e,{cards:d})},saveDatasetId:function(e,a){var t=a.payload;return t?(0,i.default)({},e,{cards:[],model:(0,i.default)({},e.model,{datasetId:t,datasetName:e.datasets.find(function(e){return e.id===t}).dataset,datasetType:e.datasets.find(function(e){return e.id===t}).type})}):(0,i.default)({},e,{cards:[],model:(0,i.default)({},e.model,{datasetId:null,datasetName:null,datasetType:null})})},saveDatasets:function(e,a){var t=a.payload;return(0,i.default)({},e,{self_datasets:t})},queryModel:function(e,a){var t=a.payload;if(t.config){var r=JSON.parse(t.config||{});t.datasetName=r&&r.dataset?r.dataset:null,console.log(t.datasetName),t.datasetId=t.datasetName?e.datasets.find(function(e){return e.dataset===t.datasetName}).id:null,t.datasetType=t.datasetId?e.datasets.find(function(e){return e.id===t.datasetId}).type:null;var n=Array.isArray(r.layers)?r.layers:[],s=r.globalVariable||{};return(0,i.default)({},e,{model:t,globalVariable:s,cards:n})}t.datasetId=null;var d=[],l={l2:0,lr:0,iteration:0};return(0,i.default)({},e,{model:t,globalVariable:l,cards:d})},appendList:function(e,a){return(0,i.default)({},e,{list:e.list.concat(a.payload)})},setRunConfig:function(e,a){var t=a.payload;return(0,i.default)({},e,{epochs:t.epochs,batchSize:t.batchSize})},changeLoading:function(e,a){return(0,i.default)({},e,{loading:a.payload})},changeGlobalVariable:function(e,a){var t=a.payload,r=t.key,n=t.value,s=(0,i.default)({},e.globalVariable);return s[r]=n,(0,i.default)({},e,{globalVariable:s})}}},e.exports=a.default}});