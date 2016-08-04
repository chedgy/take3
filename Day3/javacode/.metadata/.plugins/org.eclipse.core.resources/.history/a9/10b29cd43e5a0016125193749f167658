package pkg1;

public class Stack {
	
	private int[] store;
	private int len;

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		

	}
	
	public Stack(){
		this.store=new int[10];
		this.len=0;
	}
	
	public void push(int val){
		if (this.store.length==len-1){//grow array
			int [] tempStore=new int [(len-1)*2];
			tempStore=this.store;
			
			store=new int[(len-1)*2];
			this.store=tempStore;
		}
		
		store[len]=val;
		len++;
	}

	
	public int pop(){
		if (len==0){
			return 0;
		}else{
			return this.store[len-1];
		
		}
				
		
	}
}
