package pkg1;

public class Stack {
	
	private int[] store;
	private int len;

	public static void main(String[] args) {
		Stack st = new Stack();
		
		for ( int i=0; i< 50; i++){
			st.push(i);
		}
		
		for (int i=0; i<20;i++){
			System.out.println(st.pop());
		}
		

	}
	
	public Stack(){
		this.store=new int[10];
		this.len=0;
	}
	
	public void push(int val){
		if (this.store.length==this.len){//grow array
			int [] tempStore=new int [(this.len)*2];
			
			for (int i=0;i<this.store.length;i++){
				tempStore[i]=this.store[i];
			}
			
			
			store=new int[(this.len)*2];
			for (int i=0; i<tempStore.length;i++){
				this.store[i]=tempStore[i];
			}
			
		}
		
		this.store[this.len]=val;
		this.len++;
	}

	
	public int pop(){
		if (len==0){
			return 0;
		}else{
			this.len--;
			return this.store[this.len];
			
		
		}
				
		
	}
}
