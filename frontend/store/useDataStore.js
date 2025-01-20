import { create } from "zustand";
import { axiosInstance } from "../src/lib/axios";

export const useDataStore = create((set, get) => ({
    htmlLayout: '',
        title:'titled',
        content:'content',
        img:'link',
        currentEdit:'title',
    loading: false,
    
    getHtmlLayout: async ()=>{
        set({loading: true});
        try {
          const res = await axiosInstance.get('/emails/getEmailLayout');
          if (res.data) {
           set({htmlLayout:res.data});
          } else {
            console.error('Unexpected response format:', res.data);
          }
        } catch (e) {
          console.error('Error fetching layout:', e.message);
        } finally{
            set({loading:false});
        }
      },
      setVariables: (value) =>{
        
        const old=get().currentEdit;
        switch(old){
          case 'title':
            set({title: value});
            break;
          case 'content':
            set({content: value});
            break;  
          case 'img':
            set({img : 'no link'});
            break;
          default:
            console.log("Invalid");    
        }
      },
      setCurrEdit: (value)=>{
        set({currentEdit:value});

      }
        

}))