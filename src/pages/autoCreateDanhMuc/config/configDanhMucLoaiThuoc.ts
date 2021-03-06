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
        isFilter:false,
        sort:true,
        width: 50,
        render:true,
        renderField:"Input",
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
        text: "Thuộc loại",
        description: "Thuộc loại",
        defaultValue: "undefined",
        isShow:true,
        isFilter:false,
        sort:true,
        width: 50,
        render:true,
        renderField:"Input",
        hidden:false

    }
])


export const configDanhMucLoaiThuoc = (): AppModuleInterface => ({
    appModuleId: "DANHMUC_PHANLOAITHUOC",
    linkUrl:"/danhmuc/phanloaithuoc",
    name:"Phân loại thuốc",
    description:"Phân loại thuốc",
    defineObjectFormProps: defineObjectFormProps(),
    apiCallServer:"quanlyphanloaithuoc",
    routerDynamic:false

})