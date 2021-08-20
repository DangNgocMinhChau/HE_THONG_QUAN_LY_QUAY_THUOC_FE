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
        text: "Mã",
        description: "Mã",
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
        text: "Khu vực",
        description: "Khu vực",
        defaultValue: "undefined",
        isShow:true,
        isFilter:false,
        width: 200,
        sort:true,
        renderField: TypeControl.Input,
        hidden:false
    },
])


export const configDanhMucKhuVucDeThuoc = (): AppModuleInterface => ({
    appModuleId: "DANHMUC_KHUVUC_DETHUOC",
    linkUrl:"/danhmuc/khuvucdethuoc",
    name:"Khu vực để thuốc",
    description:"Khu vực để thuốc",
    defineObjectFormProps: defineObjectFormProps(),
    apiCallServer:"quanlykhuvucdethuoc",
    routerDynamic:false

})