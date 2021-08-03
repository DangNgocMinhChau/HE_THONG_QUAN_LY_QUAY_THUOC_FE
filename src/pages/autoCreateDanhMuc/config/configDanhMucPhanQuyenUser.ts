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
        text: "Mã quyền",
        description: "Mã quyền",
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
        text: "Tên quyền",
        description: "Tên quyền",
        defaultValue: "undefined",
        isShow:true,
        isFilter:false,
        width: 200,
        sort:true,
        renderField: TypeControl.Input,
        hidden:false
    },
])


export const configDanhMucPhanQuyenUser = (): AppModuleInterface => ({
    appModuleId: "DANHMUC_PHANQUYEN_USER_DMPQUS",
    linkUrl:"/danhmuc/phanquyen",
    name:"Phân quyền",
    description:"Phân quyền",
    defineObjectFormProps: defineObjectFormProps(),
    apiCallServer:"quanlyquyen"
})