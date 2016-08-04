package filestreams;
import java.io.*;
import java.util.*;


public class SortFile {
	
	public static void readSortWrite (String path, Writer wr){
		 File file=  new File(path);
		 FileReader reader =null;
		// FileWriter writer=null;
		 
		 
	        try {
	        	//doesn't give full line        
	        	reader= new FileReader("C:\\GitFile\\take3\\day4\\words.txt");
	        	//read whole line
	            BufferedReader bufferedReader = new BufferedReader(reader);
	            //create reader
	 
	            String line;
	            List<String> words = new ArrayList<String>(); //create list
	            
	            while ((line = bufferedReader.readLine()) != null) {//loop assigns line read and then checks if null and more data
	                //System.out.println(line);
	            	
	            	words.add(line); //read each line from reader 
	            	
	            }
	            
	            bufferedReader.close();
	            
	            Collections.sort(words,String.CASE_INSENSITIVE_ORDER); //sort list ignore case
	                      
	           

				
				if (!file.exists()) {//create file if not exist 
					file.createNewFile();
				}

	           //filewriter writes per character if used directly
				//so use a buffer to write whole line
	            
	          
	            
	            for (String s:words){  //loop thru items
	            	 // bufferedWriter.write(s + "\r\n" );  //write back to file//
	            	wr.write(s + System.lineSeparator() );
	            }
	           
	        	
	           
	            
	            
	         
	        } catch (IOException e) {
	            e.printStackTrace();
	        } finally {
	        	
	        	 try {
					reader.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
	        	 try {
					wr.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
	        }

	}

	public static void main(String[] args) {
		  Writer uw = new UpperWriter("C://gitfile//take3//day4//sorted.txt"); //user interface as type so don't need to know who handling
		  //when call readsortwrite it knows it has a writer but not what kind 
		  //behind the new keyword is going to tell us which writer to user
		  //can create another writer called LowerWriter and then create
		  //Writer lw=new UpperWriter(....) and then call readsortwrite (...., lw) and the 
		  //method doesn't need to know which is which and can hande both.
	       SortFile.readSortWrite("C://gitfile//take3//day4//words.txt", uw);
	       }
	
	

}

interface Writer{
	void write(String s) throws IOException;
	void close() throws IOException;
}

class UpperWriter implements Writer{
	private String path;
	private BufferedWriter bw;
    
    public UpperWriter(String path) {
    	 FileWriter file = null;
    	
        this.path = path;
      
        	try {
				file=new FileWriter(this.path);
				bw=new BufferedWriter(file);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} //create writer 
        // open file
      
       
    }
    
    public void write(String s) throws IOException {
    	
        
        
        bw.write(s.toUpperCase());
        
    }
    
    public void close() throws IOException {
    	bw.close();
        
    }
	
}
