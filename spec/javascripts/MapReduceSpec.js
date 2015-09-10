describe("MapReduce", function() {
  // var _;

  beforeEach(function() {
    // _ = new MapReduce();
  });

  describe("while map&reducing", function(){

    it("should be possible to access first param at $0, second at $1", function(){
      expect(mr([1,2],[3,4],"$0+$1")).toEqual("1,23,4");
    });

    it("should be possible to access first all params at $", function(){
      expect(mr([1,2],[3,4],"$")).toEqual([[1,2],[3,4]]);
    });

    it("should be possible to use a short form of the js function as ruby block", function(){
      expect(mr([1,2],"$0.map({|a| return a+1})")).toEqual([2,3]);
    });

    it("should trim all incomming paramters", function(){
      expect(mr([1,2,""],["",3,4,""],"$0+$1", "trim")).toEqual("1,23,4");
    });

    it("should make a safe return", function(){
      // SpreadsheetApp has a hardcode of 10 rows and 10 columns 
      // when calling contact for 10 array arguments - 20 elements will be returned
      // 20 is 1.66 more than 10, thus _safe_return methods of MapReduce will throw an error

      var did_get_toast=false;
      SpreadsheetApp.getActiveSpreadsheet().toast=function(message, title, seconds){did_get_toast=title=="Wrong concat/leftjoin ?"}

      mr([1,2,3,4,5,6,7,8,9],"$0.concat($0)", "trim")
      expect(did_get_toast).toEqual(true);
    });
    
  })

  describe("while concatting", function() {
    
    it("should be possible to concat horizontal array", function() {
      expect(concat([1,2],[3,4])).toEqual([1,2,3,4]);
    });

    it("should be possible to concat vertical array", function() {
      expect(concat([[1],[2]],[[3],[4]])).toEqual([[1],[2],[3],[4]]);
    });

    it("should be possible to concat all items from the single array of arrays input=$", function() {
      expect(concat([ [1,2],[3],[4] ])).toEqual([1,2,3,4]);
    });
    
  });


//   leftjoin
//   transpose
// 
// 
//   ["concat", "every", "filter", "forEach", "indexOf", "join", "lastIndexOf", "length", "map", "pop", "push", "reduce", "reduceRight", "reverse", "shift", "slice", "some", "sort", "splice", "unshift"]
// 
// sum
// map
// filter
// unique
// reduce
// int
// round
// 
// rereplace
// resub



  // describe("when song has been paused aa", function() {
  //   beforeEach(function() {
  //     player.play(song);
  //     player.pause();
  //   });
  // 
  //   it("should indicate that the song is currently paused", function() {
  //     expect(player.isPlaying).toBeFalsy();
  // 
  //     // demonstrates use of 'not' with a custom matcher
  //     expect(player).not.toBePlaying(song);
  //   });
  // 
  //   it("should be possible to resume", function() {
  //     player.resume();
  //     expect(player.isPlaying).toBeTruthy();
  //     expect(player.currentlyPlayingSong).toEqual(song);
  //   });
  // });

});


describe("Array", function() {

  describe("First/Last extentions", function() {

    it("should be possible to get null as first element of empty array", function(){
      var a=[];
      expect(a.first() === null).toEqual(true);
    });

    it("should be possible to get first element of array", function(){
      expect([undefined].first()).toEqual(undefined);
      expect([1].first()).toEqual(1);
      expect([undefined,2,3].first()).toEqual(undefined);
    });

    it("should be possible to get null as last element of empty array", function(){
      var a=[];
      expect(a.last()).toEqual(null);
    });

    it("should be possible to get last element of array", function(){
      expect([undefined].last()).toEqual(undefined);
      expect([1].last()).toEqual(1);
      expect([undefined,2,3].last()).toEqual(3);
    });
  });

  describe("Transpose extentions", function() {

    it("should be possible to convert empty array to a two dimentions empty array", function(){
      var a=[];
      a.twodim();
      expect(a).toEqual([[]]);
    });

    it("should be possible to convert an array twith one string into two dimentions array vs one string", function(){
      var a=[''];
      a.twodim();
      expect(a).toEqual([['']]);
    });


    it("should be possible to call transpose on an array", function(){
      expect(typeof [].transpose).toEqual('function');
    });
      

    it("should be possible to transpose an 'long' two dimentional array", function(){
      var a=[ [1,11],[2,12],[3,13],[4,14] ];
      var a1=a.transpose();
      expect(a).toEqual(a1);
      expect(a).toEqual([ [1,2,3,4],[11,12,13,14] ]);
    });

    it("should be possible to transpose an 'short' two dimentional array", function(){
      var a=[ [1,2,3,4],[11,12,13,14] ];
      a.transpose();
      expect(a).toEqual([ [1,11],[2,12],[3,13],[4,14] ]);
    });

    it("should be possible to transpose an 'long' two dimentional array and back", function(){
      var a=[ [1,11],[2,12],[3,13],[4,14] ];
      a.transpose().transpose();
      expect(a).toEqual([ [1,11],[2,12],[3,13],[4,14] ]);
    });
    
    it("should be possible to transpose an one dimentional array", function(){
      var a=[ 1,2,3 ];
      var a1=a.transpose();
      expect(a).toEqual(a1);
      expect(a).toEqual([ [1],[2],[3] ]);
    });

    it("should be possible to transpose an empty array", function(){
      var a=[];
      var a1=a.transpose();
      expect(a).toEqual(a1);
      expect(a).toEqual([ [] ]);
    });
    

  });


  describe("while trimming", function() {

    it("should be possible to trim a horizontal array from both sides", function() {
      expect(["",1,2,3,""].trim()).toEqual([1,2,3]);
    });

    it("should be possible to trim a vertical array from both sides", function() {
      expect([[""],[""],[""],[1],[2],[3],[""]].trim()).toEqual([[1],[2],[3]]);
    });

    it("should be possible to trim a two dimentional array from both sides", function() {
      var a = [["","",""],
               ["",1,""],
               [2,1,3],
               ["","",""],
               ["","",""],
               ["","",""]]
      expect(a.trim()).toEqual([["",1,""],[2,1,3]]);
    });
      
  });

  describe("Vertical/two-dimentional extentions", function() {

    it("should shift a two columns two dimentional array", function(){
      var a=[ [1,11],[2,12],[3,13] ];
      var a1=vshift(a);

      expect(a1).toEqual([[1],[2],[3]]);
      expect(a).toEqual([[11],[12],[13]]);
    });


    it("should shift vertical (a single column two dimentional array)", function(){
      var a=[ [1],[2],[3] ];
      var a1=vshift(a);
    
      expect(a1).toEqual([[1],[2],[3]]);
      expect(a).toEqual([]);
    });

  });

});