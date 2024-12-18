"use client"

import { MdTextFields } from "react-icons/md"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { ElementsType, FormElement, FormElementInstance } from "../FormElements"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import useDesigner from "../hooks/useDesigner"
import { Input } from "../ui/input"
import { Switch } from "../ui/switch"
import { Label } from "../ui/label"

const type: ElementsType = "TextField"
const extraAttributes = {
    label: "Text Field",
    helperText: "Helper Text",
    required: false,
    placeholder: "Value here..."
}

const propertiesSchema = z.object({
    label: z.string().min(2).max(50),
    helperText: z.string().max(200),
    required: z.boolean().default(false),
    placeHolder: z.string().max(50),

})

export const TextFieldFormElement:FormElement = {
    type, 
    construct: (id: string) => ({
        id,
        type, 
        extraAttributes,
    }),
    designerBtnElement: {
        icon: MdTextFields,
        label: "Text Field"
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent
}

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes
}

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>

function PropertiesComponent({elementInstance}:{elementInstance: FormElementInstance}){
    const element = elementInstance as CustomInstance
    const {updateElement} = useDesigner()
    const form = useForm<propertiesFormSchemaType>({
        resolver: zodResolver(propertiesSchema),
        mode: "onBlur",
        defaultValues: {
            label: element.extraAttributes.label,
            helperText: element.extraAttributes.helperText,
            required: element.extraAttributes.required,
            placeHolder: element.extraAttributes.placeholder
        }
    })
    
    useEffect(() =>{
        form.reset(element.extraAttributes)
    }, [element, form])

    function applyChanges(values: propertiesFormSchemaType){
        const {label, helperText, placeHolder, required} = values
        updateElement(element.id, {
            ...element,
            extraAttributes: {
                label,
                helperText,
                placeHolder,
                required,
            }
        })
    }

    return <Form {...form}>
        <form onBlur={form.handleSubmit(applyChanges)} className="space-y-3" onSubmit={e =>{
            e.preventDefault()
        }}>
            <FormField control={form.control} name="label" render={({field}) => (
                <FormItem>
                    <FormLabel>
                        Label
                    </FormLabel>
                    <FormControl>
                        <Input {...field} onKeyDown={e =>{
                            if(e.key === "Enter") e.currentTarget.blur()
                        }}/> 
                    </FormControl>
                    <FormDescription>
                        The label for the field <br/> It will be displayed above the field
                    </FormDescription>
                    <FormMessage/>
                </FormItem>
            )}
            />
            <FormField control={form.control} name="placeHolder" render={({field}) => (
                <FormItem>
                    <FormLabel>
                        PlaceHolder
                    </FormLabel>
                    <FormControl>
                        <Input {...field} onKeyDown={e =>{
                            if(e.key === "Enter") e.currentTarget.blur()
                        }}/> 
                    </FormControl>
                    <FormDescription>
                        The placeholder of the field
                    </FormDescription>
                    <FormMessage/>
                </FormItem>
            )}
            /> 
            <FormField control={form.control} name="helperText" render={({field}) => (
                <FormItem>
                    <FormLabel>
                        HelperText
                    </FormLabel>
                    <FormControl>
                        <Input {...field} onKeyDown={e =>{
                            if(e.key === "Enter") e.currentTarget.blur()
                        }}/> 
                    </FormControl>
                    <FormDescription>
                        The helper text of the field <br/> It will be displayed above the field
                    </FormDescription>
                    <FormMessage/>
                </FormItem>
            )}
            />
            <FormField control={form.control} name="required" render={({field}) => (
                <FormItem className="flex items-center justify-between border rounded-lg p-3 shadow-sm">
                    <div className="space-y-0.5">
                        <FormLabel>
                            Required
                        </FormLabel>
                        <FormDescription>
                            The helper text of the field <br/> It will be displayed above the field
                        </FormDescription>
                    </div>
                    <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )} />


        </form>
    </Form>
}

function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const element = elementInstance as CustomInstance;
    const { label, required, placeholder, helperText } = element.extraAttributes;
  
    return (
      <div className="flex flex-col gap-0.5 w-full"> 
        <Label className="mb-1.5"> 
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        <Input readOnly disabled placeholder={placeholder} className="mb-1" /> 
        {helperText && (
          <p className="text-muted-foreground text-[0.8rem] mt-1"> 
            {helperText}
          </p>
        )}
      </div>
    );
  }

function FormComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const element = elementInstance as CustomInstance;
    const { label, required, placeholder, helperText } = element.extraAttributes;
  
    return (
      <div className="flex flex-col gap-0.5 w-full"> 
        <Label className="mb-1.5"> 
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        <Input placeholder={placeholder} className="mb-1" /> 
        {helperText && (
          <p className="text-muted-foreground text-[0.8rem] mt-1"> 
            {helperText}
          </p>
        )}
      </div>
    );
  }