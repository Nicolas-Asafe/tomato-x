export default class Param{
    constructor(nameparam,typeparam,distro){
        this.name=nameparam
        this.type=typeparam
        this.completname=`${distro}:param_${nameparam}`
    }
}