
export default interface ObjectFormInterface{
    dataField : string,
    text: string,
    description: string,
    defaultValue?: string | boolean | object | undefined | null | number | Array<string | boolean | object | undefined>,
    isShow?:boolean,
    isFilter?:boolean,
    sort?:boolean
    width?: number,
    render?:boolean,
    renderConfig?:any,
    renderField:string,
    validate?:boolean,
    hidden:boolean,
    apiSelect?:string,
    //Dùng data cứng
    dataOption?:any,
    // render Input password
    password?:boolean,
    // render Input Number
    inputNumber?:boolean,
    selectSearch?:boolean
}