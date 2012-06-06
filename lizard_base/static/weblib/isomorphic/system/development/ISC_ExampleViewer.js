
/*

  SmartClient Ajax RIA system
  Version 6.5.1/LGPL Development Only (2008-06-30)

  Copyright 2000-2007 Isomorphic Software, Inc. All rights reserved.
  "SmartClient" is a trademark of Isomorphic Software, Inc.

  LICENSE NOTICE
     INSTALLATION OR USE OF THIS SOFTWARE INDICATES YOUR ACCEPTANCE OF THE
     SOFTWARE EVALUATION LICENSE AGREEMENT. If you have received this file
     without an Isomorphic Software license file, please see:

         http://www.isomorphic.com/licenses/isc_eval_license_050316.html

     You are not required to accept this agreement, however, nothing else
     grants you the right to copy or use this software. Unauthorized copying
     and use of this software is a violation of international copyright law.

  EVALUATION ONLY
     This software is provided for limited evaluation purposes only. You must
     acquire a deployment license from Isomorphic Software in order to use
     the SmartClient system, or any portion thereof, in any non-evaluation
     application, including internal or non-commercial applications.

  PROPRIETARY & PROTECTED MATERIAL
     This software contains proprietary materials that are protected by
     contract and intellectual property law. YOU ARE EXPRESSLY PROHIBITED
     FROM ATTEMPTING TO REVERSE ENGINEER THIS SOFTWARE OR MODIFY THIS
     SOFTWARE FOR HUMAN READABILITY.

  CONTACT ISOMORPHIC
     For more information regarding license rights and restrictions, or to
     report possible license violations, please contact Isomorphic Software
     by email (licensing@isomorphic.com) or web (www.isomorphic.com).

*/

if(window.isc&&window.isc.module_Core&&!window.isc.module_ExampleViewer){isc.module_ExampleViewer=1;isc._moduleStart=isc._ExampleViewer_start=(isc.timestamp?isc.timestamp():new Date().getTime());if(isc._moduleEnd&&(!isc.Log||(isc.Log && isc.Log.logIsDebugEnabled('loadTime')))){isc._pTM={ message:'ExampleViewer load/parse time: ' + (isc._moduleStart-isc._moduleEnd) + 'ms', category:'loadTime'};
if(isc.Log && isc.Log.logDebug)isc.Log.logDebug(isc._pTM.message,'loadTime')
else if(isc._preLog)isc._preLog[isc._preLog.length]=isc._pTM
else isc._preLog=[isc._pTM]}isc.defineClass("HScrollThumbLight","HScrollThumb");isc.A=isc.HScrollThumbLight.getPrototype();isc.A.hSrc="[ISO_DOCS_SKIN]/images/explorerScrollbar/hthumb.gif";isc.A.showGrip=false;isc.defineClass("VScrollThumbLight","VScrollThumb");isc.A=isc.VScrollThumbLight.getPrototype();isc.A.vSrc="[ISO_DOCS_SKIN]/images/explorerScrollbar/vthumb.gif";isc.A.showGrip=false;isc.defineClass("ScrollbarLight","Scrollbar");isc.A=isc.ScrollbarLight.getPrototype();isc.A.thumbOverlap=1;isc.A.startThumbOverlap=null;isc.A.endThumbOverlap=null;isc.A.showTrackEnds=false;isc.A.btnSize=16;isc.A.startImg={name:"start",width:"btnSize",height:"btnSize"};isc.A.cornerSrc="[ISO_DOCS_SKIN]/images/explorerScrollbar/corner.gif";isc.A.hSrc="[ISO_DOCS_SKIN]/images/explorerScrollbar/hscroll.gif";isc.A.vSrc="[ISO_DOCS_SKIN]/images/explorerScrollbar/vscroll.gif";isc.A.hThumbClass=isc.HScrollThumbLight;isc.A.vThumbClass=isc.VScrollThumbLight;isc.ImgSectionHeader.changeDefaults("backgroundDefaults",{backgroundColor:"#a0c0ff"});isc.defineClass("ExampleViewer","TabSet");isc.A=isc.ExampleViewer;isc.B=isc._allFuncs;isc.C=isc.B._maxIndex;isc.D=isc._funcClasses;isc.D[isc.C]=isc.A.Class;isc.B.push(isc.A.getRefDocsURL=function(){return window.exampleTree.nodeVisibility=="sdk"?"SmartClient_Reference.html":"/docs/6.0/a/b/c/go.html"}
);isc.B._maxIndex=isc.C+1;isc.A=isc.ExampleViewer.getPrototype();isc.B=isc._allFuncs;isc.C=isc.B._maxIndex;isc.D=isc._funcClasses;isc.D[isc.C]=isc.A.Class;isc.A.suppressSkinSwitch=true;isc.A.skinSwitchTitleStyle="formTitle";isc.A.tabBarThickness=28;isc.A.tabBarDefaults={baseLineSrc:"[ISO_DOCS_SKIN]/images/explorerTabs/top/baseline.png",tabDefaults:{src:"[ISO_DOCS_SKIN]/images/explorerTabs/top/tab.png",items:[{name:"start",width:"capSize",height:"capSize"},{name:"stretch",width:"*",height:"*"},{name:"end",width:"capSize",height:"capSize"}],titleStyle:"explorerTabTitle",showRollOver:true,capSize:4},stackZIndex:null,memberOverlap:0,layoutStartMargin:10,layoutEndMargin:10,baseLineThickness:4,baseLineCapSize:4};isc.A.symmetricScroller=true;isc.A.scrollerButtonSize=16;isc.A.scrollerHSrc="[ISO_DOCS_SKIN]/images/explorerTabs/top/hscroll.gif";isc.A.symmetricPickerButton=true;isc.A.pickerButtonSize=16;isc.A.pickerButtonHSrc="[ISO_DOCS_SKIN]/images/explorerTabs/top/hpicker.gif";isc.A.symmetricEdges=true;isc.A.paneContainerProperties={backgroundColor:"white",border:"0px none",showEdges:true,customEdges:null,edgeSize:4,edgeBottom:4,edgeOffsetRight:4,edgeOffsetBottom:4,edgeImage:"[SKIN]/rounded/frame/FFFFFF/5.png"};isc.A.rpcURL=isc.Page.getURL("[ISOMORPHIC]/FeatureExplorerRPC");isc.A.xmlSourceTitle="XML";isc.A.jsSourceTitle="JS";isc.A.layoutMargin=10;isc.A.membersMargin=10;isc.A.creatorName="exampleViewer";isc.A.exampleViewPaneDefaults={_constructor:"ExampleViewPane",scrollbarSize:16};isc.A.exampleSourcePaneDefaults={_constructor:"ExampleSourcePane",scrollbarSize:16};isc.A.reloadButtonDefaults={_constructor:"ImgButton",title:"Reload",src:"[ISO_DOCS_SKIN]/images/refresh.png",canHover:true,prompt:"<nobr>Reload this example.</nobr>",hoverHeight:20,width:16,height:16,layoutAlign:"center",$jo:false,isMouseTransparent:true,click:"this.exampleViewer.reloadExample()"};isc.A.fullScreenCloseMessage="&nbsp;&nbsp;&nbsp;<span style='font-style:italic;color:yellow;'>[Close this window to return to example tree]</span>";isc.B.push(isc.A.initWidget=function(){this.Super("initWidget",arguments);this.haveSCServer=isc.hasOptionalModule("SCServer");this.standardViewPane=this.viewPane=this.createAutoChild("exampleViewPane");this.viewtab=this.getTab(this.addTab({title:"View",icon:"[ISO_DOCS_SKIN]/images/icon_view.png",pane:this.viewPane}));this.reloadButton=this.createAutoChild("reloadButton");this.tabBarControls=["tabScroller","tabPicker","skinSwitcher",this.reloadButton]
if(this.url)this.loadExample(this.url)}
,isc.A.reloadExample=function(){this.loadExample(this.exampleConfig)}
,isc.A.getControl=function(_1){if(_1=="skinSwitcher"){if(!this.skinSwitcher){this.skinSwitcher=isc.DynamicForm.create({autoDraw:false,viewer:this,colWidths:[40,130],width:170,items:[{name:"skin",editorType:"select",width:120,defaultValue:this.currentSkin,valueMap:{standard:"Standard",SmartClient:"SmartClient",Cupertino:"Cupertino",fleet:"Fleet",TreeFrog:"TreeFrog"},title:"Skin",change:"form.viewer.setSkin(value)",titleStyle:this.skinSwitchTitleStyle}]})}
return this.skinSwitcher}
return this.Super("getControl",arguments)}
,isc.A.shouldShowControl=function(_1){if(_1=="skinSwitcher")return(!this.suppressSkinSwitch&&this.showSkinSwitch);return this.Super("shouldShowControl",arguments)}
,isc.A.setSkin=function(_1){var _2=document.location.href,_3=_2.indexOf("#"),_4=_2.indexOf("?");var _5;if(_3!=-1){_5=_2.substring(_3);_2=_2.substring(0,_3)}
if(_4==-1)_2+="?skin="+_1;else{var _6=_2.indexOf("skin=");if(_6>0){var _7=_2.indexOf("&",_6);if(_7==-1)_2=_2.substring(0,_6);else _2=_2.substring(0,_6)+_2.substring(_7+1)}
if(_4==_2.length-1)_2+="skin="+_1;else _2+="&skin="+_1}
if(_5!=null)_2+=_5;document.location.replace(_2)}
,isc.A.loadExample=function(_1){this.exampleConfig=_1;if(isc.isA.String(_1))_1={url:_1};this.showSkinSwitch=_1.showSkinSwitcher;var _2=[];if(_1.jsURL){_2.add({url:_1.jsURL,isSource:true,showSource:_1.showSource,exampleSource:true,fullScreen:_1.fullScreen,canEdit:_1.canEdit!="false"})}
if(_1.xmlURL){_2.add({url:_1.xmlURL,isSource:true,showSource:_1.showSource,fullScreen:_1.fullScreen,exampleSource:!_1.jsURL,canEdit:_1.canEdit!="false"})}
if(_1.css||_1.cssURL){_2.add(this.loadCSS({url:_1.css?_1.css:_1.cssURL,canEdit:_1.canEdit!="false",isCSS:true}))}
if(_2.length==0&&_1.url){var c={url:_1.url,isSource:true,showSource:_1.showSource,exampleSource:true,external:_1.external,iframe:_1.iframe,fullScreen:_1.fullScreen,externalWindowConfig:_1.externalWindowConfig,canEdit:_1.canEdit!="false"&&!_1.external&&!_1.iframe};if(_1.iframe)c.doEval=false;_2.add(c)}
if(_1.dataSource){var _4=_1.canEdit;if(_4!=null)_4=_4=="true";else _4=_1.dataSource.contains(".")?true:false
_2.add({dataSource:_1.dataSource,canEdit:_4})}
if(_1.tabs){for(var i=0;i<_1.tabs.length;i++){var _6=isc.addProperties({},_1.tabs[i]);_6.canEdit=_6.canEdit!="false"&&!_1.external&&!_1.iframe;if(_6.url&&_6.url.match(/\.css$/i)&&!_1.external&&!_1.iframe){_6.isCSS=true;_6=this.loadCSS(_6)}
_2.add(_6)}}
if(this.waitOnAnimation)this.$49i=true;if(_1.requiresModules){this.loadingModules=true;isc.FileLoader.loadModules(_1.requiresModules,this.getID()+".modulesLoaded()")}
if(!isc.hasOptionalModule("SCServer")){isc.RPCManager.sendRequest({actionURL:this.rpcURL,clientContext:{exampleFiles:_2},useSimpleHttp:true,params:{noSCServer:true,data:isc.Comm.xmlSerialize("data",{method:"loadFiles",exampleFiles:_2})},showPrompt:true,promptStyle:"cursor",serverOutputAsString:true,callback:this.getID()+".loadExampleFilesCallback(rpcRequest, rpcResponse, eval(data));"})}else{isc.RPCManager.sendRequest({actionURL:this.rpcURL,clientContext:{exampleFiles:_2},data:{method:"loadFiles",exampleFiles:_2},showPrompt:true,promptStyle:"cursor",callback:this.getID()+".loadExampleFilesCallback(rpcRequest, rpcResponse, data);"})}
if(this.exampleGlobals){isc.Class.destroyGlobals(this.exampleGlobals);delete this.exampleGlobals}
if(this.isDrawn()||this.autoShow)this.show()}
,isc.A.modulesLoaded=function(){this.loadingModules=null;this.loadExampleFilesCallback()}
,isc.A.loadCSS=function(_1){if(this.remainingCSSFiles==null)this.remainingCSSFiles=0;this.remainingCSSFiles++;if(_1.doEval!="false"){var _2=_1.url.startsWith("/")?_1.url:isc.Page.getIsomorphicDocsDir()+"inlineExamples/"+_1.url;isc.FileLoader.loadFile(_2,this.getID()+".cssFileLoaded()")}else{_1.canEdit=false}
return _1}
,isc.A.animationComplete=function(){this.$49i=false;this.loadExampleFilesCallback()}
,isc.A.cssFileLoaded=function(){this.remainingCSSFiles--;if(this.remainingCSSFiles==0)this.loadExampleFilesCallback()}
,isc.A.loadExampleFilesCallback=function(_1,_2,_3){if(_1){this.rpcRequest=_1;this.rpcResponse=_2;this.exampleFiles=_3}
if(this.$49i||this.remainingCSSFiles||this.loadingModules){return}
if(_1==null&&this.rpcRequest==null)return;_1=this.rpcRequest;_2=this.rpcResponse;_3=this.exampleFiles;this.rpcRequest=this.rpcResponse=this.exampleFiles=null;for(var i=0;i<_3.length;i++){var _5=_3[i];isc.addProperties(_5,_1.clientContext.exampleFile);if(!this.haveSCServer&&_5.isDataSource)_5.forceJS=true}
if(!this.showExample(_3))return;this.currentExampleFiles=_3;var _6;while((_6=this.getTab(1))!=null)this.removeTab(_6);var _7=[];for(var i=0;i<_3.length;i++){var _5=_3[i];if(_5.showSource==false||_5.showSource=="false")continue;var _8=_5.title;if(_5.isSource&&!_5.external&&!_5.iframe)
_8=_5.isXML?this.xmlSourceTitle:this.jsSourceTitle;if(_8==null){_8=_5.url||_5.dataSource;_8=_8.replace(/.*\/(.*)/,"$1")}
if(_5.exampleSource)this.currentExampleSourceFile=_5;_7.add({title:_8,icon:"[ISO_DOCS_SKIN]/images/icon_code.png",exampleFile:_5})}
this.addTabs(_7)}
,isc.A.tabSelected=function(_1,_2,_3,_4){if(_4.pane)return;if(!isc.SyntaxHiliter){isc.showPrompt("Hang on - loading code preview modules");isc.FileLoader.loadModules("SyntaxHiliter,RichTextEditor",this.getID()+".sourcePaneModulesLoaded("+_1+")");return}
this.sourcePaneModulesLoaded(_1)}
,isc.A.sourcePaneModulesLoaded=function(_1){var _2=this.getTabObject(_1);var _3=_2.exampleFile;isc.clearPrompt();var _4=this.createAutoChild("exampleSourcePane",{rpcURL:this.rpcURL,canEdit:_3.canEdit,source:_3.forceJS?this.getJSSource(_3):_3.fileContents,exampleFile:_3});this.updateTab(_1,_4)}
,isc.A.showExample=function(_1){if(this.fullScreenBlurb!=null){this.fullScreenBlurb.destroy();this.fullScreenBlurb=null}
this.viewPane=this.standardViewPane;if(!this.viewPane.isDrawn())this.viewPane.draw();if(!_1)_1=this.currentExampleFiles;var _2=isc.StringBuffer.create();var _3,_4,_5,_6;var _7;for(var i=0;i<_1.length;i++){var _9=_1[i];if(_9.external){_7=_9;break}
if(_9.iframe){_4=_9;break}
if(_9.fullScreen){_5=true}
if(_9.error){isc.clearPrompt();isc.warn(_9.error);return false}
if(_3==null&&_9.exampleSource)
_3=this.getJSSource(_9);if(_9.isSource)continue;if(_9.loadAtEnd){var _10=this.getJSSource(_9);if(_6)_6=_10;else _6+=_10;continue}
if(_9.doEval!==false&&_9.doEval!=="false"&&!_9.isCSS){_2.append(this.getJSSource(_9),"\r\n")}}
if(_7){isc.Class.destroyGlobals(this.exampleGlobals);var _11=this.createLaunchExampleBlurb(_7);this.exampleGlobals=[_11.getID()];this.addCanviiToView(this.exampleGlobals);_11.draw();this.selectTab(0);isc.clearPrompt();return true}else if(_4){isc.Class.destroyGlobals(this.exampleGlobals);var _12=this.createIFRAME(_4);this.exampleGlobals=[_12.getID()];this.addCanviiToView(this.exampleGlobals);_12.draw();this.selectTab(0);isc.clearPrompt();return true}else{_2=_2.append(_3,_6).toString()}
if(_5){this.fullScreenEvalBuf=_2;isc.Class.destroyGlobals(this.exampleGlobals);this.fullScreenBlurb=this.createLaunchFullScreenBlurb();this.viewPane.addChild(this.fullScreenBlurb);this.selectTab(0);isc.clearPrompt();return true}
this.evalExample(_2);this.selectTab(0);this.show();return true}
,isc.A.getJSSource=function(_1){return _1.isXML?_1.xmlToJS:_1.fileContents}
,isc.A.evalExample=function(_1){if(this.exampleGlobals)isc.Class.destroyGlobals(this.exampleGlobals);isc.clearPrompt();var _2=[];var _3;try{this.evalAndCaptureGlobals(_1,_2)}catch(e){if(_2)isc.Class.destroyGlobals(_2);isc.globalsSnapshot=[];_3=e;if(this.lastEvalBuf){this.exampleGlobals=this.evalAndCaptureGlobals(this.lastEvalBuf);this.addCanviiToView(this.exampleGlobals)}
this.logWarn("Error from this code:\n\n"+_1);isc.warn("Error evaluating your changes:<br><br>"+"ErrorType: "+e.name+"<br>"+"ErrorMessage: "+e.message);return false}
this.exampleGlobals=_2;this.addCanviiToView(this.exampleGlobals);this.lastEvalBuf=_1;return true}
,isc.A.evalAndCaptureGlobals=function(_1,_2){isc.noAutoDraw=true;var _3=isc.globalsSnapshot=_2||[];eval(_1);delete isc.noAutoDraw;isc.globalsSnapshot=null;return _3}
,isc.A.addCanviiToView=function(_1){if(!this.isDrawn())this.draw();for(var i=0;i<_1.length;i++){var _3=window[_1[i]];if(_3&&isc.isA.Canvas(_3)&&_3.parentElement==null&&_3.masterElement==null&&!isc.isA.Menu(_3)&&!_3.isModal)
{if(_3.canDragResize||_3.canDragReposition)_3.keepInParentRect=true;this.viewPane.viewContainer.addChild(_3,null,_3.autoDraw!==false)}}}
,isc.A.createLaunchExampleBlurb=function(_1){var _2=isc.VLayout.create({autoDraw:false,width:"100%",height:"100%",membersMargin:5,example:_1,members:[isc.Label.create({height:1,overflow:"visible",autoDraw:false,contents:"This example opens in a new window - click the button below to"+" launch the example.<P><B>NOTE:</B> you may need to bypass your"+" pop-up blocker by holding down CTRL as you click <i>Launch Example</i>"}),isc.IButton.create({autoDraw:false,overflow:"visible",icon:"[ISO_DOCS_SKIN]/images/icon_popup.png",title:"Launch Example",viewer:this,exampleFile:_1,click:function(){this.viewer.launchExternalExample(this.exampleFile)}})]});var _3=this.exampleConfig;if(_3.screenshot){var _4={showShadow:true,showEdges:true,shadowOffset:10,shadowSoftness:5,src:isc.Page.getIsomorphicDocsDir()+"inlineExamples/"+_3.screenshot,viewer:this,exampleFile:_1,click:function(){this.viewer.launchExternalExample(this.exampleFile)}}
if(_3.screenshotHeight&&_3.screenshotWidth){_4.width=_3.screenshotWidth;_4.height=_3.screenshotHeight}else{_4.height="*"}
_2.addMember(isc.Img.create(_4))}
return _2}
,isc.A.createLaunchFullScreenBlurb=function(){var _1=isc.VLayout.create({styleName:"examplePane",autoDraw:false,width:"100%",height:"100%",membersMargin:5,members:[isc.Label.create({height:1,overflow:"visible",autoDraw:false,contents:'This is a full-screen example - click the "Show Example" button '+'to show fullscreen.'}),isc.IButton.create({autoDraw:false,overflow:"visible",icon:"[ISO_DOCS_SKIN]/images/features.png",title:"Show Example",viewer:this,click:function(){this.viewer.showFullScreenExample()}})]});this.fullScreenLaunchButton=_1.members[1];var _2=this.exampleConfig;if(_2.screenshot){var _3={autoDraw:false,showShadow:true,showEdges:true,shadowOffset:10,shadowSoftness:5,src:isc.Page.getIsomorphicDocsDir()+"inlineExamples/"+_2.screenshot,viewer:this,click:function(){this.viewer.showFullScreenExample()}}
if(_2.screenshotHeight&&_2.screenshotWidth){_3.width=_2.screenshotWidth;_3.height=_2.screenshotHeight}else{_3.height="*"}
_1.addMember(isc.Img.create(_3))}
return _1}
,isc.A.createIFRAME=function(_1){var _2=_1.url;if(!_2.startsWith("/"))_2=isc.Page.getIsomorphicDocsDir()+"inlineExamples/"+_1.url;var _3=isc.Canvas.create({autoDraw:false,width:"100%",height:"100%",contentsURL:_2,contentsType:"page",destroy:function(){if(isc.Browser.isIE){var _4=this.getHandle().firstChild.contentWindow;_4.document.open();_4.document.write("");_4.document.close()}
this.Super("destroy",arguments)}});return _3}
,isc.A.launchExternalExample=function(_1){var _2=isc.Page.getIsomorphicDocsDir()+"inlineExamples/"+_1.url,_3=_1.externalWindowConfig;window.open(_2,"_blank",_3)}
,isc.A.showFullScreenExample=function(){this.showClickMask();var _1=this.fullScreenLaunchButton.getPageRect();if(!this.animationOutline){this.animationOutline=isc.Canvas.create({autoDraw:false,border:"2px solid black",top:_1[1],left:_1[0],width:_1[2],height:_1[3]})}else{this.animationOutline.setRect(_1)}
this.animationOutline.show();this.animationOutline.animateRect(0,0,isc.Page.getWidth(),isc.Page.getHeight(),{target:this,methodName:"completeFullScreenShow"},500);if(!this.fullScreenExmapleWindow)
this.fullScreenExampleWindow=isc.FullScreenExampleWindow.create({viewer:this,exampleConfig:this.exampleConfig});this.fullScreenExampleWindow.setTitle(this.exampleConfig.title+this.fullScreenCloseMessage)}
,isc.A.completeFullScreenShow=function(){this.hideClickMask();this.fullScreenExampleWindow.show();if(this.viewPane!=this.fullScreenExampleWindow.viewPane){this.viewPane=this.fullScreenExampleWindow.viewPane;this.delayCall("evalExample",[this.fullScreenEvalBuf],0)}}
,isc.A.hideFullScreenExample=function(){this.showClickMask();this.animationOutline.setRect(0,0,isc.Page.getWidth(),isc.Page.getHeight());this.animationOutline.show();this.fullScreenExampleWindow.clear();var _1=this.fullScreenLaunchButton.getPageRect();this.animationOutline.animateRect(_1[0],_1[1],_1[2],_1[3],{target:this,methodName:"completeFullScreenHide"},500)}
,isc.A.completeFullScreenHide=function(){this.animationOutline.hide();this.hideClickMask()}
);isc.B._maxIndex=isc.C+26;isc.defineClass("FullScreenExampleWindow","Window");isc.A=isc.FullScreenExampleWindow.getPrototype();isc.B=isc._allFuncs;isc.C=isc.B._maxIndex;isc.D=isc._funcClasses;isc.D[isc.C]=isc.A.Class;isc.A.autoDraw=false;isc.A.width="100%";isc.A.height="100%";isc.A.showMinimizeButton=false;isc.A.showCloseButton=true;isc.A.canDragReposition=false;isc.A.canDragResize=false;isc.A.showShadow=false;isc.B.push(isc.A.closeClick=function(){this.viewer.hideFullScreenExample()}
,isc.A.initWidget=function(){this.Super("initWidget",arguments);var _1={};if(this.exampleConfig.backgroundColor)_1.backgroundColor=this.exampleConfig.backgroundColor;this.viewPane=isc.ExampleViewPane.create(_1);this.items=[this.viewPane]}
);isc.B._maxIndex=isc.C+2;isc.defineClass("ExampleSourcePane","Canvas");isc.A=isc.ExampleSourcePane.getPrototype();isc.B=isc._allFuncs;isc.C=isc.B._maxIndex;isc.D=isc._funcClasses;isc.D[isc.C]=isc.A.Class;isc.A.overflow="hidden";isc.A.backgroundColor="white";isc.A.margin=10;isc.A.sourceViewerDefaults={_constructor:"SourceViewer",width:"100%",height:"100%"};isc.A.sourceEditorDefaults={_constructor:"SourceEditor",width:"100%",height:"100%",useRichEditor:!(isc.Browser.isSafari||isc.Browser.isOpera)};isc.B.push(isc.A.initWidget=function(){this.Super("initWidget",arguments);if(this.canEdit){this.view=this.sourceEditor=this.createAutoChild("sourceEditor")}else{this.view=this.sourceViewer=this.createAutoChild("sourceViewer")}
this.addChild(this.view);if(this.source)this.setSource(this.source)}
,isc.A.setSource=function(_1){this.source=_1;var _2="js";if(!this.exampleFile.forceJS&&(this.exampleFile.isXML||this.exampleFile.external||this.exampleFile.url.match(/\.wsdl|xml$/i)))_2="xml";if(this.exampleFile.url&&this.exampleFile.url.match(/\.css$/i))_2="css";this.view.setSource(_1,_2)}
,isc.A.revertEdit=function(){this.sourceEditor.setSource(this.source)}
,isc.A.tryEditedCode=function(){var _1=this.sourceEditor.getSource();this.exampleFile.fileContents=_1;if(this.exampleFile.isXML){if(!isc.hasOptionalModule("SCServer")){isc.RPCManager.sendRequest({actionURL:this.rpcURL,useSimpleHttp:true,serverOutputAsString:true,params:{noSCServer:true,data:isc.Comm.xmlSerialize("data",{method:"xmlToJS",exampleFiles:[this.exampleFile]})},callback:this.getID()+".xmlToJSCallback(rpcRequest, rpcResponse, eval(data))"})}else{isc.RPCManager.sendRequest({actionURL:this.rpcURL,data:{method:"xmlToJS",exampleFiles:[this.exampleFile]},callback:this.getID()+".xmlToJSCallback(rpcRequest, rpcResponse, data)"})}}else if(this.exampleFile.isCSS){if(!isc.hasOptionalModule("SCServer")){isc.RPCManager.sendRequest({actionURL:this.rpcURL,useSimpleHttp:true,serverOutputAsString:true,params:{noSCServer:true,data:isc.Comm.xmlSerialize("data",{method:"bounceCSS",exampleFile:this.exampleFile})},callback:this.getID()+".loadCSS(eval(data))"})}else{isc.RPCManager.sendRequest({actionURL:this.rpcURL,data:{method:"bounceCSS",exampleFile:this.exampleFile},callback:this.getID()+".loadCSS(data)"})}}else{this.setCurrentExampleSource(this.exampleFile);this.exampleViewer.showExample()}}
,isc.A.loadCSS=function(_1){isc.FileLoader.loadFile(isc.RPC.addParamsToURL(_1,{ts:new Date().getTime()}),this.getID()+".loadCSSCallback()")}
,isc.A.loadCSSCallback=function(){isc.Canvas.clearCSSCaches();this.exampleViewer.showExample()}
,isc.A.xmlToJSCallback=function(_1,_2,_3){var _4=_3[0];if(_4.error){isc.warn(_4.error);return}
this.exampleFile.xmlToJS=_4.xmlToJS;this.setCurrentExampleSource(this.exampleFile);this.exampleViewer.showExample()}
,isc.A.setCurrentExampleSource=function(_1){if(_1.isSource&&!_1.exampleSource){_1.exampleSource=true;this.exampleViewer.currentExampleSourceFile.exampleSource=false;this.exampleViewer.currentExampleSourceFile=this.exampleFile}}
);isc.B._maxIndex=isc.C+8;isc.defineClass("SourceViewer","VLayout");isc.A=isc.SourceViewer.getPrototype();isc.B=isc._allFuncs;isc.C=isc.B._maxIndex;isc.D=isc._funcClasses;isc.D[isc.C]=isc.A.Class;isc.A.sourceContainerDefaults={_constructor:"Canvas",styleName:"explorerSourceViewer",overflow:"auto",canSelectText:true,height:"*"};isc.B.push(isc.A.initWidget=function(){this.Super("initWidget",arguments);this.sourceContainer=this.createAutoChild("sourceContainer");this.addMember(this.sourceContainer)}
,isc.A.setSource=function(_1,_2){if(!_1)_1=isc.emptyString;if(_2){if(!this.syntaxHiliter){if(_2=="xml")this.syntaxHiliter=isc.XMLSyntaxHiliter.create();else if(_2=="js")this.syntaxHiliter=isc.JSSyntaxHiliter.create();else if(_2=="css")this.syntaxHiliter=isc.CSSSyntaxHiliter.create();else this.logDebug("Can't find hiliter for type: "+_2)}}
if(this.syntaxHiliter){this.sourceContainer.setContents(this.syntaxHiliter.hilite(_1))}else{this.sourceContainer.setContents(_1.asHTML())}}
);isc.B._maxIndex=isc.C+2;isc.defineClass("SourceEditor","VLayout");isc.A=isc.SourceEditor.getPrototype();isc.B=isc._allFuncs;isc.C=isc.B._maxIndex;isc.D=isc._funcClasses;isc.D[isc.C]=isc.A.Class;isc.A.membersMargin=5;isc.A.richSourceEditorDefaults={getBrowserSpellCheck:function(){return false},_constructor:"RichTextCanvas",cursor:isc.Canvas.TEXT,styleName:"explorerSourceEditor",countLines:true,changed:function(){this.creator.sourceChanged()}};isc.A.sourceEditorFormDefaults={browserSpellCheck:false,_constructor:"DynamicForm",overflow:"hidden",autoFocus:false,height:"*",numCols:1,itemChange:function(){this.creator.sourceChanged()},fields:[{formItemType:"textArea",name:"source",showTitle:false,height:"*",width:"*"}]};isc.A.sourceEditorToolbarDefaults={_constructor:"HLayout",overflow:"visible",height:1,membersMargin:10,tryItButtonDefaults:{_constructor:"IButton",title:"Try it",icon:"[ISO_DOCS_SKIN]/images/icon_run.png",click:"this.parentElement.creator.tryClicked()"},revertButtonDefaults:{_constructor:"IButton",title:"Revert",disabled:true,showDisabledIcon:false,icon:"[ISO_DOCS_SKIN]/images/icon_revert.png",click:"this.parentElement.creator.revertClicked()"},initWidget:function(){this.Super("initWidget",arguments);this.refDocsURL=isc.ExampleViewer.getRefDocsURL();this.tryItButton=this.createAutoChild("tryItButton");this.revertButton=this.createAutoChild("revertButton");this.addMembers([this.tryItButton,this.revertButton,isc.LayoutSpacer.create({width:"*"})]);this.docSearch=isc.DynamicForm.create({ID:this.getID()+"$50n",autoDraw:false,refDocsURL:this.refDocsURL,numCols:2,colWidths:["*",100],width:320,cellPadding:0,doSearch:function(){var _1=this.getValue('searchString');window.open(this.refDocsURL+(_1?"?search="+encodeURIComponent(_1):""),"refDocWindow")},fields:[{name:"searchString",width:"*",title:"Search <a target='refDocWindow' href='"+this.refDocsURL+"' onclick='"+this.getID()+"$50n.doSearch();return false;'>SmartClient Documentation</a>",keyPress:function(_2,_3,_4){if(_4=="Enter")_3.doSearch()}}]});this.addMembers([this.docSearch])}};isc.B.push(isc.A.initWidget=function(){this.Super("initWidget",arguments);this.useRichEditor=this.useRichEditor&&isc.SyntaxHiliter&&isc.RichTextCanvas;this.sourceEditor=this.createAutoChild(this.useRichEditor?"richSourceEditor":"sourceEditorForm");this.sourceEditorToolbar=this.createAutoChild("sourceEditorToolbar");this.addMembers([this.sourceEditor,this.sourceEditorToolbar])}
,isc.A.setSource=function(_1,_2){if(this.useRichEditor){if(_2){if(_2=="xml")this.syntaxHiliter=isc.XMLSyntaxHiliter.create();else if(_2=="js")this.syntaxHiliter=isc.JSSyntaxHiliter.create();else if(_2=="css")this.syntaxHiliter=isc.CSSSyntaxHiliter.create();else{this.logDebug("Can't find hiliter for type: "+_2);delete this.syntaxHiliter}}}
if(this.useRichEditor){this.sourceEditor.setSyntaxHiliter(this.syntaxHiliter);this.sourceEditor.setContents(_1)}else{this.sourceEditor.setValue("source",_1)}}
,isc.A.getSource=function(){return this.useRichEditor?this.sourceEditor.getContents():this.sourceEditor.getValue("source")}
,isc.A.sourceChanged=function(){this.sourceEditorToolbar.revertButton.enable()}
,isc.A.tryClicked=function(_1){this.creator.tryEditedCode()}
,isc.A.revertClicked=function(_1){this.creator.revertEdit();this.sourceEditorToolbar.revertButton.disable()}
);isc.B._maxIndex=isc.C+6;isc.defineClass("ExampleViewPane","Canvas");isc.A=isc.ExampleViewPane.getPrototype();isc.B=isc._allFuncs;isc.C=isc.B._maxIndex;isc.D=isc._funcClasses;isc.D[isc.C]=isc.A.Class;isc.A.autoDraw=false;isc.A.scrollbarConstructor="ScrollbarLight";isc.A.backgroundColor="white";isc.A.children=[{autoChildName:"viewContainer",styleName:"examplePane",width:"100%",height:"100%"},{autoChildName:"sizer",zIndex:100,overflow:"hidden"}];isc.A.overflow="auto";isc.B.push(isc.A.childResized=function(_1){this.Super("childResized",arguments);var _2=this.children;if(_2.length<2)return;_2[1].setRect(0,0,_2[0].getVisibleWidth(),_2[0].getVisibleHeight())}
);isc.B._maxIndex=isc.C+1;if(!isc.GrippySplitbar){isc.defineClass("GrippySplitbar","ImgSplitbar");isc.A=isc.GrippySplitbar.getPrototype();isc.A.imageWidth=7;isc.A.imageHeight=16}
isc.defineClass("FeatureExplorer","HLayout");isc.A=isc.FeatureExplorer.getPrototype();isc.A.creatorName="featureExplorer";isc.A.resizeBarSize=14;isc.A.resizeBarClass="GrippySplitbar";isc.A.layoutMargin=10;isc.A.backgroundColor="#EEEEEE";isc.A.exampleTreeDefaults={_constructor:"TreeGrid",showHeader:false,leaveScrollbarGap:false,selectionType:"single",animateFolders:true,animateRowsMaxTime:200,recordClick:function(_1,_2){var _3=isc.addProperties({},_2);if(_3.showSkinSwitcher==null){var _4=_1.data.getParents(_2);for(var i=0;i<_4.length;i++){if(_4[i].showSkinSwitcher!=null){_3.showSkinSwitcher=_4[i].showSkinSwitcher;break}}}
_1.featureExplorer.showExample(_3)},bodyDefaults:{scrollbarConstructor:"ScrollbarLight",scrollbarSize:16},scrollbarSize:16,showEdges:true,edgeSize:5,edgeImage:"[SKIN]/rounded/frame/FFFFFF/5.png",styleName:"normal",bodyStyleName:"normal",width:200,showResizeBar:true,nodeIcon:"[ISO_DOCS_SKIN]/images/explorerTree/gears.png",folderIcon:"[ISO_DOCS_SKIN]/images/explorerTree/folder.png"};isc.A.exampleTitleDefaults={_constructor:"Label",styleName:"explorerExampleTitle",height:30,canSelectText:true,wrap:false};isc.A.exampleDescriptionDefaults={_constructor:"Label",styleName:"explorerExampleDescription",height:90,canSelectText:true,valign:"top",overflow:"auto"};isc.A.exampleSpacerDefaults={_constructor:"LayoutSpacer",height:6};isc.A.exampleViewerDefaults={_constructor:"ExampleViewer",visibility:"hidden",autoShow:true};isc.A.rightPaneDefaults={_constructor:"Canvas"};isc.A.titlePageDefaults={_constructor:"VLayout",width:"100%",height:"100%",visibility:"hidden",titlePagePaneDefaults:{_constructor:"VStack",backgroundColor:"#FFFFFF",showEdges:true,edgeSize:5,edgeImage:"[SKIN]/rounded/frame/FFFFFF/5.png",layoutMargin:5,layoutAlign:"center",width:"80%",titlePageHeaderDefaults:{_constructor:"Label",styleName:"explorerTitlePageTitle",height:30,wrap:false},titlePageDescriptionDefaults:{_constructor:"Label",height:1,styleName:"explorerTitlePageDescription",valign:"top",overflow:"visible",dynamicContents:true,canSelectText:true},folderListDefaults:{_constructor:"Label",styleName:"explorerFolderList",valign:"top",overflow:"visible",height:50,canSelectText:true},screenshotDefaults:{_constructor:"Img",layoutAlign:"center"},autoChildren:["titlePageHeader","titlePageDescription","folderList","screenshot"]},autoChildren:[{autoChildName:"topSpacer",_constructor:"LayoutSpacer",height:"35%"},"titlePagePane",{autoChildName:"bottomSpacer",_constructor:"LayoutSpacer",height:"65%"}]};isc.A.examplePageDefaults={_constructor:"VLayout",visibility:"hidden",width:"100%",height:"100%"};isc.A.autoChildParentMap={exampleTitle:"examplePage",exampleDescription:"examplePage",exampleSpacer:"examplePage",exampleViewer:"examplePage",titlePage:"rightPane",examplePage:"rightPane"};isc.A.autoChildren=["exampleTree","rightPane","titlePage","examplePage","exampleTitle","exampleDescription","exampleSpacer","exampleViewer"];isc.A.exampleChecks=[{flag:"needServer",message:"This example requires the ISC integration server.",test:function(){return window.location.href.startsWith("http")}},{flag:"needXHR",message:"This example requires the XMLHttpRequest object."+"  You'll need to enable ActiveX or, if you're running IE7"+" making sure the native XMLHttpRequest support is enabled is sufficient.",test:function(){return isc.RPCManager.xmlHttpRequestAvailable()}},{flag:"needXML",message:function(){if(isc.Browser.isSafari){return"This example requires a native XML parser, which is not supported in Safari."}
return"XML Processing in IE requires ActiveX.  Please enable ActiveX to see"+" this example"},test:function(){return isc.XMLTools.nativeXMLAvailable()}}];isc.A.initialExample="_Welcome";isc.A=isc.FeatureExplorer.getPrototype();isc.B=isc._allFuncs;isc.C=isc.B._maxIndex;isc.D=isc._funcClasses;isc.D[isc.C]=isc.A.Class;isc.B.push(isc.A.initWidget=function(){this.Super("initWidget",arguments);this.addAutoChildren(this.autoChildren);if(this.treeData)this.exampleTree.setData(this.treeData);isc.History.registerCallback({method:this.historyCallback,target:this});isc.Page.setEvent(isc.Page.isLoaded()?"idle":"load",this.getID()+".autoJumpToExample()",isc.Page.FIRE_ONCE)}
,isc.A.historyCallback=function(_1,_2){this.jumpToExample(_1,true);this.noAutoJumpToExample=true}
,isc.A.autoJumpToExample=function(){if(!this.noAutoJumpToExample){this.jumpToExample(isc.History.getCurrentHistoryId()||this.initialExample,true)}}
,isc.A.jumpToExample=function(_1,_2){if(this.exampleViewer&&this.exampleViewer.fullScreenExampleWindow!=null&&this.exampleViewer.fullScreenExampleWindow.isDrawn()){this.exampleViewer.hideFullScreenExample()}
if(_1==null)_1=this.initialExample;_1=_1.replace(/\./g," ");_1=_1.replace(/\|/g,"_");var _3=this.exampleTree.data;var _4=_1.startsWith(_3.pathDelim)?_3.find(_1):_3.findById(_1);if(_4==null){this.logWarn("Can't find example for id: "+_1+" - defaulting to the welcome page");_4=_3.find(this.initialExample)}
var _5=isc.addProperties({},_4);if(_5.showSkinSwitcher==null){var _6=_3.getParents(_4);for(var i=0;i<_6.length;i++){if(_6[i].showSkinSwitcher!=null){_5.showSkinSwitcher=_6[i].showSkinSwitcher;break}}}
this.showExample(_5,_2);_3.openFolders(_3.getParents(_4));var _8=_3.indexOf(_4);var _9=this;isc.Timer.setTimeout(function(){_9.exampleTree.selection.deselectAll();_9.exampleTree.selectRecord(_8);_9.exampleTree.scrollRecordIntoView(_8)},0)}
,isc.A.formatFolderList=function(_1){var _2=this.exampleTree;var _3=_2.data;var _4=_3.getChildren(_1);if(!_4||_4.length==0)return isc.emptyString;var _5=isc.StringBuffer.create();_5.append("<table class='explorerFolderList' align='center' cellSpacing='5'>");var _6=[];var _7=Math.round(_4.length/ 2);var _8=0;var _9=_7;for(var i=0;i<_7;i++){var _11=_4[_8++];var _12=_4[_9++];this.$49j(_11,_5);_5.append("<td width=10>&nbsp;</td>");this.$49j(_12,_5);_5.append("</tr>")}
_5.append("</table>");return _5.toString()}
,isc.A.$49j=function(_1,_2){var _3=this.exampleTree;var _4=_3.data;if(!_1){_2.append("<td>&nbsp;</td>");return}
var _5=_4.isFolder(_1)?"[ISO_DOCS_SKIN]/images/explorerTree/folder_closed.png":"[ISO_DOCS_SKIN]/images/explorerTree/gears.png";_5=isc.Page.getURL(_5);_2.append("<td>",isc.Canvas.imgHTML(_5,16,16),"&nbsp;<a href='' onclick='",this.getID(),".jumpToExample(\"",this.genExampleId(_1),"\");return false;'>",_4.getTitle(_1),"</a></td>")}
,isc.A.genExampleId=function(_1){var _2=_1.id!=null?_1.id:this.exampleTree.data.getPath(_1);return _2.replace(/ /g,".")}
,isc.A.hideRightPane=function(){this.exampleTree.showResizeBar=false;this.rightPane.hide()}
,isc.A.clearState=function(){delete this.currentExampleConfig}
,isc.A.showExample=function(_1,_2){if(this.exampleTree.data.isFolder(_1))_1.titlePage="true";if(!_2)isc.History.addHistoryEntry(this.genExampleId(_1));this.currentExampleConfig=_1;if(_1.ref){var _3=this.exampleTree.data.findById(_1.ref);if(_3!=null){var _4=_1.description;_3=this.exampleTree.data.getCleanNodeData(_3);isc.addProperties(_1,_3);if(_4)_1.description=_4}else{this.logWarn("Couldn't find example by id for ref: "+_1.ref)}
_1.ref=null}
if(_1.titlePage=="true"){this.examplePage.hide();var _5=this.titlePage.titlePagePane;_5.titlePageHeader.setContents(_1.title||_1.name);_5.titlePageDescription.setContents(_1.description);_5.folderList.setContents(this.formatFolderList(_1));if(_1.screenshot){_5.screenshot.setSrc(_1.screenshot);_5.screenshot.resizeTo(_1.screenshotWidth,_1.screenshotHeight);_5.screenshot.show()}else{_5.screenshot.hide()}
this.titlePage.show()}else{this.titlePage.hide();this.examplePage.show();this.exampleTitle.setContents(_1.title||_1.name);this.exampleDescription.setVAlign("top");var _6=[];for(var i=0;i<this.exampleChecks.length;i++){var _8=this.exampleChecks[i];var _9=_1[_8.flag];if(_9!=null&&!_8.test(_1)){var _10=_9;if(_10=="true")_10=_8.message;_10=isc.isA.Function(_10)?_10(_1):_10;_6.add(_10)}}
if(_1.missingModules){_6.add("This example is disabled in this SDK because it requires the "+" following optional SmartClient components: <a href='"+isc.licensingPage+"' target=_blank>"+_1.missingModules+"</a>"+"<p>Click <a target=_blank href='http://www.smartclient.com/#"+isc.History.getCurrentHistoryId()+"'>here</a> to see this example on smartclient.com.")}
if(_6.length>0){this.exampleViewer.hide();var _11=isc.StringBuffer.create();_11.append("<div class='explorerCheckErrorMessage'>");for(var i=0;i<_6.length;i++){_11.append(_6[i],"<BR><BR>")}
_11.append("</div>");_11.append(_1.description);this.exampleDescription.setContents(_11.toString());this.exampleDescription.setHeight("*");return}
this.exampleDescription.setContents(_1.description);if(_1.url||_1.jsURL||_1.xmlURL){this.exampleViewer.loadExample(_1)
this.exampleDescription.setHeight(_1.descriptionHeight||92);this.exampleDescription.setVAlign("center")}else{this.exampleViewer.hide();this.exampleDescription.setHeight("*")}}}
);isc.B._maxIndex=isc.C+10;isc.defineClass("ExampleTree","Tree");isc.A=isc.ExampleTree.getPrototype();isc.B=isc._allFuncs;isc.C=isc.B._maxIndex;isc.D=isc._funcClasses;isc.D[isc.C]=isc.A.Class;isc.A.nameProperty="title";isc.A.pathDelim="_";isc.B.push(isc.A.init=function(){this.Super("init",arguments);var _1=this.getDescendants(this.root);var _2={};for(var i=0;i<_1.length;i++){var _4=_1[i];if(_4.requiresModules){if(!isc.hasOptionalModules(_4.requiresModules));_4.missingModules=isc.getMissingModules(_4.requiresModules).getProperty("name").join(", ")}
if(_4.title.contains(".")||_4.title.contains("_")){this.logWarn("Node title: "+_4.title+" contains invalid char '.' or '_'")}
if(_4.id&&(_4.id.contains(".")||_4.id.contains("_"))){this.logWarn("Node id: "+_4.id+" (titled: "+_4.title+") contains invalid char '.' or '_'")}
if(_4.id&&_2[_4.id]){this.logWarn("Duplicate id detected on node titled: "+_4.title+" id: "+_4.id+" conflicts with previously encountered node titled: "+_2[_4.id])}else if(_4.id){_2[_4.id]=_4.title}
if(_4.visibility&&_4.visibility!=this.nodeVisibility){this.remove(_4,true);continue}
if(!_4.ref)continue;var _5=this.findById(_4.ref);if(!_5){this.logWarn("The node titled '"+this.getTitle(_4)+"' references a non-existant id: "+_4.ref)}
if(!this.isFolder(_5))continue;var _6=this.getChildren(_5);if(!_6||!_6.length)continue;var _7=this.getCleanNodeData(_6);if(!this.isFolder(_4))this.convertToFolder(_4);this.addList(_7,_4);delete _4.ref;if(!_4.description)_4.description=_5.description}}
);isc.B._maxIndex=isc.C+1;isc.defineClass("ExplorerShell","VLayout");isc.A=isc.ExplorerShell.getPrototype();isc.A.layoutTopMargin=5;isc.A.layoutLeftMargin=10;isc.A.layoutRightMargin=10;isc.A.layoutBottomMargin=5;isc.A.membersMargin=5;isc.A.headerDefaults={_constructor:"Canvas",height:45,contents:isc.Canvas.imgHTML("[ISO_DOCS_SKIN]/images/featureExplorer_title.gif")};isc.A.footerDefaults={_constructor:"Label",height:15,overflow:"hidden",align:"right",contents:"<span style='color:#E0E0E0'>&copy;2000-2005 Isomorphic Software, Inc.</span>"};isc.A.featureExplorerDefaults={_constructor:"FeatureExplorer"};isc.A.autoChildren=["header","featureExplorer","footer"];isc.Page.setAppImgDir(isc.Page.getIsomorphicDocsDir()+"exampleImages/");isc._moduleEnd=isc._ExampleViewer_end=(isc.timestamp?isc.timestamp():new Date().getTime());if(isc.Log&&isc.Log.logIsInfoEnabled('loadTime'))isc.Log.logInfo('ExampleViewer module init time: ' + (isc._moduleEnd-isc._moduleStart) + 'ms','loadTime');}else{if(window.isc && isc.Log && isc.Log.logWarn)isc.Log.logWarn("Duplicate load of module 'ExampleViewer'.");}

/*

  SmartClient Ajax RIA system
  Version 6.5.1/LGPL Development Only (2008-06-30)

  Copyright 2000-2007 Isomorphic Software, Inc. All rights reserved.
  "SmartClient" is a trademark of Isomorphic Software, Inc.

  LICENSE NOTICE
     INSTALLATION OR USE OF THIS SOFTWARE INDICATES YOUR ACCEPTANCE OF THE
     SOFTWARE EVALUATION LICENSE AGREEMENT. If you have received this file
     without an Isomorphic Software license file, please see:

         http://www.isomorphic.com/licenses/isc_eval_license_050316.html

     You are not required to accept this agreement, however, nothing else
     grants you the right to copy or use this software. Unauthorized copying
     and use of this software is a violation of international copyright law.

  EVALUATION ONLY
     This software is provided for limited evaluation purposes only. You must
     acquire a deployment license from Isomorphic Software in order to use
     the SmartClient system, or any portion thereof, in any non-evaluation
     application, including internal or non-commercial applications.

  PROPRIETARY & PROTECTED MATERIAL
     This software contains proprietary materials that are protected by
     contract and intellectual property law. YOU ARE EXPRESSLY PROHIBITED
     FROM ATTEMPTING TO REVERSE ENGINEER THIS SOFTWARE OR MODIFY THIS
     SOFTWARE FOR HUMAN READABILITY.

  CONTACT ISOMORPHIC
     For more information regarding license rights and restrictions, or to
     report possible license violations, please contact Isomorphic Software
     by email (licensing@isomorphic.com) or web (www.isomorphic.com).

*/

