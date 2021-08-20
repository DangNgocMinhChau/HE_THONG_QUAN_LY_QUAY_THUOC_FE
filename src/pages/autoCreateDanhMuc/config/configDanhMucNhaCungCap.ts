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
        dataField : "tenNhaCungCap",
        text: "Tên",
        description: "Tên",
        defaultValue: "undefined",
        isShow:true,
        isFilter:false,
        width: 200,
        sort:true,
        renderField: TypeControl.Input,
        hidden:false
    },
    {
        dataField : "diaChiNhaCungCap",
        text: "Địa chỉ",
        description: "Địa chỉ",
        defaultValue: "undefined",
        isShow:true,
        isFilter:false,
        width: 200,
        sort:true,
        renderField: TypeControl.Input,
        hidden:false
    },
    {
        dataField : "mstNhaCungCap",
        text: "Mã số thuế",
        description: "Mã số thuế",
        defaultValue: "undefined",
        isShow:true,
        isFilter:false,
        width: 200,
        sort:true,
        renderField: TypeControl.Input,
        hidden:false
    },
    {
        dataField : "soDienThoaiNhaCungCap",
        text: "Số điện thoại",
        description: "Số điện thoại",
        defaultValue: "undefined",
        isShow:true,
        isFilter:false,
        width: 200,
        sort:true,
        renderField: TypeControl.Input,
        hidden:false
    },
    {
        dataField : "zalo",
        text: "Zalo",
        description: "Zalo",
        defaultValue: "undefined",
        isShow:true,
        isFilter:false,
        width: 200,
        sort:true,
        renderField: TypeControl.Input,
        hidden:false
    },
    {
        dataField : "email",
        text: "Email",
        description: "Email",
        defaultValue: "undefined",
        isShow:true,
        isFilter:false,
        width: 200,
        sort:true,
        renderField: TypeControl.Input,
        hidden:false
    },
])


export const configDanhMucNhaCungCap = (): AppModuleInterface => ({
    appModuleId: "DANHMUC_NHA_CUNGCAP",
    linkUrl:"/danhmuc/nhacungcap",
    name:"Nhà cung cấp",
    description:"Nhà cung cấp",
    defineObjectFormProps: defineObjectFormProps(),
    apiCallServer:"nhacungcap",
    routerDynamic:false
})