let Commen={
    init:()=>{
        String.prototype.truncate = function(start=0,end=this.length){
            return this.length <= end ? this.toString() : this.substring(start, end) + "...";
        }
    },
}
Commen.init();
export default Commen;


