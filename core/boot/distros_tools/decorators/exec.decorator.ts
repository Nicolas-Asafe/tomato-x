export function Exec(name:string){
    return function (constructor: any) {
       constructor.prototype.name = name;   
    }
}