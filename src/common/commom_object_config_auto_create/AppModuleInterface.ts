
import ObjectFormInterface from "./../commom_object_config_auto_create/ObjectFormInterface"

export default interface AppModuleInterface{
    appModuleId: string,
    linkUrl:string,
    name:string,
    description:string,
    defineObjectFormProps: ObjectFormInterface[];
    apiCallServer:string
}