import { create } from "zustand";
import { axiosInstance } from "../src/lib/axios";

export const useDataStore = create((set, get) => ({
    htmlLayout: '',
        title:'Title',
        content:'Content',
        img:'link',
        currentEdit:'title',
    loading: false,
    setImage: (value)=>{
      set({img: value});
    },
    
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
          default:
            console.log("Invalid");    
        }
      },
      setCurrEdit: (value)=>{
        set({currentEdit:value});

      },
      postObject: async()=>{
        try{
          set({loading:true});
          const title=get().title;
          const content=get().content;
          const imageUrl=get().img;
          const res= await axiosInstance.post('/emails/uploadEmailConfig',{title,content,imageUrl});
          if(res){
            console.log("Object saved in Backend");
          }
        }catch(e){
          console.log("error while posting the html object",e.message);
        }finally{
          set({loading:false});
        }
      }  

}))