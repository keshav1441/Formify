"use client"

import { ElementsType, FormElement, FormElementInstance } from "../FormElements"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import useDesigner from "../hooks/useDesigner"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { LuHeading2} from "react-icons/lu"

const type: ElementsType = "SubTitleField"
const extraAttributes = {
    title: "SubTitle Field"
}

const propertiesSchema = z.object({
    title: z.string().min(2).max(50)
})

export const SubTitleFieldFormElement:FormElement = {
    type, 
    construct: (id: string) => ({
        id,
        type, 
        extraAttributes,
    }),
    designerBtnElement: {
        icon: LuHeading2,
        label: "SubTitle Field"
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,
    
    validate: ()=> true,
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
            title: element.extraAttributes.title,
        }
    })

    function applyChanges(values: propertiesFormSchemaType){
        const {title} = values
        updateElement(element.id, {
            ...element,
            extraAttributes: {
                title,
            }
        })
    }

    return <Form {...form}>
        <form onBlur={form.handleSubmit(applyChanges)} className="space-y-3" onSubmit={e =>{
            e.preventDefault()
        }}>
            <FormField control={form.control} name="title" render={({field}) => (
                <FormItem>
                    <FormLabel>
                        SubTitle
                    </FormLabel>
                    <FormControl>
                        <Input {...field} onKeyDown={e =>{
                            if(e.key === "Enter") e.currentTarget.blur()
                        }}/> 
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
            />


        </form>
    </Form>
}

function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const element = elementInstance as CustomInstance;
    const { title } = element.extraAttributes;
  
    return (
      <div className="flex flex-col gap-0.5 w-full"> 
        <Label className="text-muted-foreground mb-2"> 
          SubTitle Field
        </Label>
        <p className="text-lg">{title}</p>
      </div>
    );
  }

function FormComponent({ elementInstance,}: { elementInstance: FormElementInstance;  }) {
    const element = elementInstance as CustomInstance;
    const { title } = element.extraAttributes;
    return (
      <p className="text-lg">{title}</p>
    );
  }