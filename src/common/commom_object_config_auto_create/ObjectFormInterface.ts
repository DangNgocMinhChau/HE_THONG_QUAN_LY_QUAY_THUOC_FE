
export default interface ObjectFormInterface{
    dataField : string,
    text: string,
    description: string,
    // [] => select multi ; "" => select thường ;  
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
    //Dùng data cứng => nếu có thì mặc định sẽ dùng data này , ngược lại sẽ call api
    dataOption?:any,
    // render Input password
    password?:boolean,
    // render Input Number
    inputNumber?:boolean,
    // true => select search
    selectSearch?:boolean
    // mặc định sẽ lấy mã làm value (nếu valueId = true thì value = id )
    valueId?:boolean
}