var app = angular.module("myModule",[]);

// making controller //
app.controller("mycontroller", function($scope){
	$scope.changeview = "template.html";

	/******************************/
	/*       Making Table        */
	/****************************/

	// main function for making tables views //
	$scope.change = function(){
		 var x=25,y=25;
		 var widthS = document.getElementById("sell1");
		 var width = parseInt(widthS.options[widthS.selectedIndex].value);
		 var lengthS = document.getElementById("sell2");
		 var length = parseInt(lengthS.options[lengthS.selectedIndex].value);
		 var heightS = document.getElementById("sell3");
		 var height = parseInt(heightS.options[heightS.selectedIndex].value);
		 var widthTS = document.getElementById("sell4");
		 var widthT = parseInt(widthTS.options[widthTS.selectedIndex].value);		 
		 var widthLS = document.getElementById("sell5");
		 var widthL = parseInt(widthLS.options[widthLS.selectedIndex].value);
		 var lengthLS = document.getElementById("sell6");
		 var lengthL = parseInt(lengthLS.options[lengthLS.selectedIndex].value);
		 // now we have width, length, height, widthT, lengthL,widthL
		 var w=width/15;
		 var l= length/15;
		 // top view
		 var rectangle1 = document.getElementById("canvasA");
		 var rect1 = rectangle1.getContext("2d");
		 rect1.fillStyle = "#CD853F";
		 rect1.fillRect(x,y,width,widthT);
		 rect1.fillStyle = "#87CEFA";
		 rect1.fillRect(x+w,y+widthT,widthL,height-widthT);
		 rect1.fillStyle = "#87CEFA";
		 rect1.fillRect(x-w+width-widthL,y+widthT,widthL,height-widthT);
		 // side view  
		 var rectangle2 = document.getElementById("canvasB");
		 var rect2 = rectangle2.getContext("2d");
		 rect2.fillStyle = "#CD853F";
		 rect2.fillRect(x,y,length,widthT);
		 rect2.fillStyle = "#87CEFA";
		 rect2.fillRect(x+l,y+widthT,lengthL,height-widthT);
		 rect2.fillStyle = "#87CEFA";
		 rect2.fillRect(x-l+length-lengthL,y+widthT,lengthL,height-widthT);
		 // top view
		 var rectangle3 = document.getElementById("canvasC");
		 var rect3 = rectangle3.getContext("2d");
		 rect3.fillStyle = "#CD853F";
		 rect3.fillRect(x,y,width,length);
		 // bottom view
		 var rectangle4 = document.getElementById("canvasD");
		 var rect4 = rectangle4.getContext("2d");
		 rect4.fillStyle = "#CD853F";
		 rect4.fillRect(x,y,width,length);
		 rect4.fillStyle = "#87CEFA";
		 rect4.fillRect(width+x-widthL-w,y+l,widthL,lengthL);
		 rect4.fillStyle = "#87CEFA";
		 rect4.fillRect(x+width-widthL-w,y-l+length-lengthL,widthL,lengthL);
		 rect4.fillStyle = "#87CEFA";
		 rect4.fillRect(x+w,y+l,widthL,lengthL);
		 rect4.fillStyle = "#87CEFA";
		 rect4.fillRect(x+w,y-l+length-lengthL,widthL,lengthL);
		}		
	
	// reseting the Table canvases //
	$scope.resetTable = function(){
		var x=0,y=0,w=600,l=600;
		var rectangle1 = document.getElementById("canvasA");
		var rect1 = rectangle1.getContext("2d");
		rect1.clearRect(x,y,w,l);
		var rectangle2 = document.getElementById("canvasB");
		var rect2 = rectangle2.getContext("2d");
		rect2.clearRect(x,y,w,l);
		var rectangle3 = document.getElementById("canvasC");
		var rect3 = rectangle3.getContext("2d");
		rect3.clearRect(x,y,w,l);
		var rectangle4 = document.getElementById("canvasD");
		var rect4 = rectangle4.getContext("2d");
		rect4.clearRect(x,y,w,l);
	}
	
	// including tablecanvas.html //
	$scope.tableInc = "/templates/tablecanvas.html";

	/******************************/
	/*  Making Beam and Coloumn  */
	/****************************/

	// including beamcanvas.html //
	$scope.beamInc = "/templates/beamcanvas.html";

	// main function calling everything for making profections //
	$scope.drawit = function(){
        var draw1 = document.getElementById("can1"); 
        var draw2 = document.getElementById("can2");  
	    var draw3 = document.getElementById("can3");
	    var draw4 = document.getElementById("can4");
	    $scope.makeBeam(draw4);
	    $scope.internalViews(draw1);
	    $scope.internalViews(draw2);
	    $scope.internalViews(draw3);
		
    }
 	
 	// function for making beam //
    $scope.makeBeam = function(a){ 	
    	var length = parseInt(document.getElementById("lenSel").value);
    	var depth = parseInt(document.getElementById("depSel").value);
    	var spacing = parseInt(document.getElementById("spaceSel").value);
    	var mS = document.getElementById("mainSel");
    	var diaMain = parseInt(mS.options[mS.selectedIndex].value);
    	var aS = document.getElementById("anchorSel");
    	var diaAnchor = parseInt(aS.options[aS.selectedIndex].value);
    	var sS = document.getElementById("stirupSel");
    	var diaStirup = parseInt(sS.options[sS.selectedIndex].value);
    	var dr = a.getContext("2d");
        var x=10, y=35, canvasLength=1250-x, clr=25, hc=150, scaleLen=length+4*hc;
        var scale = canvasLength/scaleLen;
        if(scale<=1){
            length =length*scale;
            depth =depth*scale;
            diaMain = diaMain*scale;
            diaAnchor =diaAnchor*scale;
            diaStirup =diaStirup*scale;
            hc=hc*scale;
            clr=clr*scale;
            spacing=spacing*scale;
        }
    	// making of beam  //
    	dr.fillStyle="#D1D1D1";
    	dr.fillRect(x+hc,y,length+2*hc,depth);
    	
    	// making of columns //
    	dr.fillStyle="#D1D1D1";
    	dr.fillRect(x,y+depth,2*hc,2*hc);
    	dr.fillStyle="#D1D1D1";
    	dr.fillRect(x+hc+length+hc,y+depth,2*hc,2*hc);

         // Dimensioning  //
        $scope.dimensionL = function(dr){
            dr.beginPath();
            dr.moveTo(x+2*hc+3, y+depth+8);
            dr.lineTo(x+2*hc+length-4, y+depth+8);
            dr.lineWidth = 2;
            dr.stroke();
            dr.beginPath();
            dr.moveTo(x+2*hc+3,y+depth+2);
            dr.lineTo(x+2*hc+3,y+depth+14);
            dr.lineWidth= 2;
            dr.stroke();
            dr.beginPath();
            dr.moveTo(x+2*hc+length-4,y+depth+2);
            dr.lineTo(x+2*hc+length-4,y+depth+14);
            dr.lineWidth= 2;
            dr.stroke();
            dr.font = '20pt Calibri';
            dr.fillStyle = 'black';
            dr.fillText("L",x+2*hc+length/2,y+depth+50);
        }

        $scope.dimensionD = function(dr){
            dr.beginPath();
            dr.moveTo(x+hc-8,y+2);
            dr.lineTo(x+hc-8,y+depth-3);
            dr.lineWidth = 2;
            dr.stroke();
            dr.beginPath();
            dr.moveTo(x+hc-14,y+2);
            dr.lineTo(x+hc-2,y+2);
            dr.lineWidth = 2;
            dr.stroke();
            dr.beginPath();
            dr.moveTo(x+hc-14,y+depth-3);
            dr.lineTo(x+hc-2,y+depth-3);
            dr.lineWidth = 2;
            dr.stroke();
            dr.font = '20pt Calibri';
            dr.fillStyle = 'black';
            dr.fillText("D",x+hc-35,y+depth/2);
        }

    	// making of anchor bar //
    	$scope.makeAnchor = function(dr){
    		dr.beginPath();
    		dr.moveTo(x+hc+clr,y+clr);
    		dr.lineTo(x+hc+length+2*hc-clr,y+clr);
    		dr.lineWidth = diaAnchor;
    		dr.stroke();
    	}
    	
    	// making of main bar //
    	$scope.makeMain = function(dr){
    		dr.beginPath();
    		dr.moveTo(x+hc+clr,y+depth-clr);
    		dr.lineTo(x+hc+length+2*hc-clr,y+depth-clr);
    		dr.lineWidth = diaMain;
    		dr.stroke();
    	}
    	
    	// making of stirups //
    	$scope.makeStirup = function(dr){
	    	for(var i=x+hc+clr+25; i<x+hc+length+2*hc-clr-25;i++ ){
	    		dr.moveTo(i,y+clr);
	    		dr.lineTo(i,y+depth-clr);
	    		dr.lineWidth = diaStirup;
	    		dr.stroke();
	    		i=i+spacing;
	    	} 
		}
        // calling functions //
        $scope.dimensionL(dr);
        $scope.dimensionD(dr);
    	$scope.makeAnchor(dr);
    	$scope.makeMain(dr);
    	$scope.makeStirup(dr);
    }

    // making of the internal views //
    $scope.internalViews = function(a){
    	var y=20 , clr=25 ;
    	var width = parseInt(document.getElementById("widSel").value);
    	var depth = parseInt(document.getElementById("depSel").value);
    	var mS = document.getElementById("mainSel");
    	var diaMain = parseInt(mS.options[mS.selectedIndex].value);
    	var aS = document.getElementById("anchorSel");
    	var diaAnchor = parseInt(aS.options[aS.selectedIndex].value);
    	var sS = document.getElementById("stirupSel");
    	var diaStirup = parseInt(sS.options[sS.selectedIndex].value);
    	var dr = a.getContext("2d");
    	var center = (width- 2*clr -diaStirup -diaMain)/2;
    	var radiusMain = diaMain/2;
    	var canvasDeep=400 ;
    	var z = 35;
        var scale= canvasDeep/(depth+50);
        if(scale<=1){
            clr=clr*scale;
            width=width*scale;
            depth=depth*scale;
            diaMain=diaMain*scale;
            diaAnchor=diaAnchor*scale;
            diaStirup=diaStirup*scale;
            center=center*scale;
            radiusMain=radiusMain*scale;
            // x=x*scale;
            z=z*scale;
        }
        var x = (canvasDeep-width)/2;

    	// making of concerete //
    	dr.fillStyle = "#D1D1D1";
    	dr.fillRect(x,y,width,depth);

        // Dimensioning //
        $scope.dimensionD = function(dr){
            dr.beginPath();
            dr.moveTo(x-8,y+2);
            dr.lineTo(x-8,y+depth-2);
            dr.lineWidth = 2;
            dr.stroke();
            dr.beginPath();
            dr.moveTo(x-14,y+2);
            dr.lineTo(x-2,y+2);
            dr.lineWidth = 2;
            dr.stroke();
            dr.beginPath();
            dr.moveTo(x-14,y+depth-2);
            dr.lineTo(x-2,y+depth-2);
            dr.lineWidth = 2;
            dr.stroke();
            dr.font = '20pt Calibri';
            dr.fillStyle = 'black';
            dr.fillText("D",x-35,y+depth/2);
        }
        $scope.dimensionW = function(){
            dr.beginPath();
            dr.moveTo(x,y+depth+8);
            dr.lineTo(x+width,y+depth+8);
            dr.lineWidth = 2;
            dr.stroke();
            dr.beginPath();
            dr.moveTo(x,y+depth+2);
            dr.lineTo(x,y+depth+14);
            dr.lineWidth = 2;
            dr.stroke();
            dr.beginPath();
            dr.moveTo(x+width,y+depth+2);
            dr.lineTo(x+width,y+depth+14);
            dr.lineWidth = 2;
            dr.stroke();
            dr.font = '20pt Calibri';
            dr.fillStyle = 'black';
            dr.fillText("W",x+width/2,y+depth+40);
        }

    	// making of stirups //
    	$scope.makingStirupsRect = function(dr){
	    	dr.beginPath();
	    	dr.moveTo(x+clr,y+clr);
	    	dr.lineTo(x+clr,y+depth-clr);
	    	dr.lineTo(x+width-clr,y+depth-clr);
	    	dr.lineTo(x+width-clr,y+clr);
	    	dr.closePath();
	    	dr.lineWidth=diaStirup;
	    	dr.lineJoin = "round";
	    	dr.stroke();
    	}

    	// making of circles //
    	$scope.makingAnchBar = function(dr){
    		dr.beginPath();
    		dr.arc(x+clr+diaStirup+diaAnchor/2,y+clr+diaStirup+diaAnchor/2,diaAnchor/2,0,2*Math.PI);
    		dr.fillStyle = "black";
    		dr.fill();
    		dr.stroke();
    		dr.beginPath();
    		dr.arc(x+width-clr-diaStirup-diaAnchor/2,y+clr+diaStirup+diaAnchor/2,diaAnchor/2,0,2*Math.PI);
    		dr.fillStyle = "black";
    		dr.fill();
    		dr.stroke();
    	}

    	$scope.makingMainBar = function(dr){
    		dr.beginPath();
    		dr.arc(x+clr+diaStirup+diaMain/2,y+depth-clr-diaStirup-diaMain/2,radiusMain,0,2*Math.PI);
    		dr.fillStyle = "black";
    		dr.fill();
    		dr.stroke();
    		dr.beginPath();
    		dr.arc(x+width-clr-diaStirup-diaMain/2,y+depth-clr-diaStirup-diaMain/2,radiusMain,0,2*Math.PI);
    		dr.fillStyle = "black";
    		dr.fill();
    		dr.stroke();

    	// making of the inner main bars //
    		dr.beginPath();
    		dr.arc(x+clr+diaStirup+diaMain+center/2,y+depth-clr-diaStirup-diaMain/2,radiusMain,0,2*Math.PI);
    		dr.fillStyle = "black";
    		dr.fill();
    		dr.stroke();
    		dr.beginPath();
    		dr.arc(x+width-clr-diaStirup-diaMain-center/2,y+depth-clr-diaStirup-diaMain/2,radiusMain,0,2*Math.PI);
    		dr.fillStyle = "black";
    		dr.fill();
    		dr.stroke();

    	// making of curves //
    		dr.beginPath();
    		dr.moveTo(x+clr,y+clr+ diaStirup+3+ diaAnchor/2);
    		dr.lineTo(x+clr+ z*Math.cos(0.785398), y+clr+ diaStirup+3+ diaAnchor/2 +z*Math.sin(0.785398));
            dr.lineWidth = diaStirup;
    		dr.lineCap = "round";
    		dr.stroke();
        // making another //
            dr.beginPath();
            dr.moveTo(x+clr+ diaStirup+3+ diaAnchor/2,y+clr);
            dr.lineTo(x+clr+diaStirup+3+ diaAnchor/2 + z*Math.cos(0.785398), y+clr+z*Math.sin(0.785398));
            dr.lineWidth = diaStirup;
            //dr.strokeStyle = "#494848";
            dr.lineCap = "round";
            dr.stroke();
    	}
        // calling functions //
        $scope.dimensionW(dr);
    	$scope.makingStirupsRect(dr);
    	$scope.makingAnchBar(dr);
    	$scope.makingMainBar(dr);
        $scope.dimensionD(dr);

    }

    // Clearing Beam all canvases //
    $scope.resetBeam = function(){
    	var can1 = document.getElementById("can1"); 
        var can2 = document.getElementById("can2");  
	    var can3 = document.getElementById("can3");
	    var can4 = document.getElementById("can4");
	    var x=0,y=0,w=1300,h=1200;
	    var clearCan1 = can1.getContext("2d");
	    clearCan1.clearRect(x,y,w,h);
	    var clearCan2 = can2.getContext("2d");
	    clearCan2.clearRect(x,y,w,h);
	    var clearCan3 = can3.getContext("2d");
	    clearCan3.clearRect(x,y,w,h);
	    var clearCan4 = can4.getContext("2d");
	    clearCan4.clearRect(x,y,w,h);
    }

    // Download PDF //
    $scope.downloadPdf = function(){
        var doc = new jsPDF('1','mm','a4');
        var length = parseInt(document.getElementById("lenSel").value);
        var width = parseInt(document.getElementById("widSel").value);
        var depth = parseInt(document.getElementById("depSel").value);
        var spacing = parseInt(document.getElementById("spaceSel").value);
        var mS = document.getElementById("mainSel");
        var diaMain = parseInt(mS.options[mS.selectedIndex].value);
        var aS = document.getElementById("anchorSel");
        var diaAnchor = parseInt(aS.options[aS.selectedIndex].value);
        var sS = document.getElementById("stirupSel");
        var diaStirup = parseInt(sS.options[sS.selectedIndex].value);
        var spacing = parseInt(document.getElementById("spaceSel").value);
        $scope.down = function(can,data){           
            var pdfcans = document.getElementById(can);
            var imgdata = pdfcans.toDataURL('image/png');
            doc.text(20,20,'Cross-Section View of Beam ('+data+'-side)');
            doc.addImage(imgdata,'PNG',20,40);
            doc.text(20,190,"Specifications - ");
            doc.text(20,200,"D = Depth of the Beam = "+depth+" mm");
            doc.text(20,210,"W = Width of the Beam = "+width+" mm");
            doc.text(20,220,"Diameter of the Main Bar = "+diaMain+" mm");
            doc.text(20,230,"Diameter of the Anchor Bar = "+diaAnchor+" mm");
            doc.text(20,240,"Diameter of the Stirrup Bar = "+diaStirup+" mm");           
        }
        $scope.downBeam = function(can){   
            var pdfcans = document.getElementById(can);
            var imgdata = pdfcans.toDataURL('image/png');
            doc.text(20,20,'Internal View of Beam');
            doc.addImage(imgdata,'PNG',10,40,180,100);
            doc.text(20,140,"Specifications - ");
            doc.text(20,150,"D = Depth of the Beam = "+depth+" mm");
            doc.text(20,160,"L = Length of the Beam = "+length+" mm");
            doc.text(20,170,"Diameter of the Main Bar = "+diaMain+" mm");
            doc.text(20,180,"Diameter of the Anchor Bar = "+diaAnchor+" mm");
            doc.text(20,190,"Diameter of the Stirrup Bar = "+diaStirup+" mm");
            doc.text(20,200,"Spacing between Stirrups = "+spacing+" mm");           
        }

        $scope.down("can1","left");
        doc.addPage();
        $scope.down("can2","right");
        doc.addPage();
        $scope.down("can3","center");
        doc.addPage();
        $scope.downBeam("can4");
        doc.save("test.pdf");
    }
    
});