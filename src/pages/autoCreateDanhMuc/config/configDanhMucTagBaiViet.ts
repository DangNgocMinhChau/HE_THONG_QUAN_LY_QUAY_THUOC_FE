import AppModuleInterface from "../../../common/commom_object_config_auto_create/AppModuleInterface";
import ObjectFormInterface from "../../../common/commom_object_config_auto_create/ObjectFormInterface";
import {TypeControl} from "../../../common/commom_object_config_auto_create/TypeControl.js";

const defineObjectFormProps = () : ObjectFormInterface [] => ([
    {
        dataField : "id",
        text: "ID",
        description: "ID",
        defaultValue: "undefined",
        isShow:false,
        isFilter:true,
        width: 50,
        sort:true,
        render:true,
        renderField:TypeControl.Input,
        hidden:true
    },
    {
        dataField : "ma",
        text: "Tag ",
        description: "Tag ",
        defaultValue: "undefined",
        isShow:true,
        isFilter:false,
        width: 200,
        sort:true,
        renderField: TypeControl.Input,
        validate:true,
        hidden:false

    },
    {
        dataField : "ten",
        text: "Tên ",
        description: "Tên ",
        defaultValue: "undefined",
        isShow:true,
        isFilter:false,
        width: 200,
        sort:true,
        renderField: TypeControl.Input,
        hidden:false
    },
])


export const configDanhMucTagBaiViet = (): AppModuleInterface => ({
    appModuleId: "DANHMUC_TAGBAIVIET",
    linkUrl:"/danhmuc/tagbaiviet",
    name:"Tag",
    description:"Tag",
    defineObjectFormProps: defineObjectFormProps(),
    apiCallServer:"quanlytag",
    routerDynamic:false
})