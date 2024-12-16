import { TextFieldFormElement } from "./fields/TextField";

export type ElementsType = "TextField";

export type FormElementInstance = {
    id: string;
    type: ElementsType;
    extraAttributes?: Record<string, "">;
  };
  

export type FormElement = {
  type: ElementsType;
    construct:(id:string) =>FormElementInstance;
  designerBtnElement:{
    icon:React.ElementType,
    label:string
  };
  designerComponent: React.FC<{
    elementInstance : FormElementInstance,
  }>;
  formComponent: React.FC<{
    elementInstance : FormElementInstance,
  }>;
  propertiesComponent: React.FC<{
    elementInstance : FormElementInstance,
  }>;
};



type FormElementsType = { [key in ElementsType]: FormElement };

export const FormElements: FormElementsType = {
  TextField: TextFieldFormElement,
};