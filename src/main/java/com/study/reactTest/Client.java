package com.study.reactTest;

import java.net.Socket;
import java.io.File;

public class Client {
	Socket socket = null;
	//String serverIp = "172.31.32.190";
	//String serverIp = "211.107.143.216";
	String serverIp =IP.ip;
	//String serverIp ="3.38.242.35";
	int serverPort = 8000;
	String fileName;
	String result;

	public Client(String fileName) {
		this.fileName = fileName;
		try {
			// 서버 연결
			socket = new Socket(serverIp, serverPort); // socket(),connect();
			System.out.println("서버에 연결되었습니다.");
			System.out.println(serverIp + " : " + serverPort);

			FileSender fileSender = new FileSender(socket, fileName);

			fileSender.start();//run() 스레드
			fileSender.join();//스레드 관련
			result = fileSender.getResult();//여기에서 음식정보 받아옴!!
			//정적 변수에 저장
			StaticData.FoodList=result;

			System.out.println("result from server : " + result);
			//여기서 삭제하면 될듯 filename이 경로인듯함
			File file = new File(fileName);
			if( file.exists() ){
				System.out.println("임시파일 있음");
				//if(true){//이건 임시파일 삭제 안할떄 디버깅용
				if(file.delete()){
					System.out.println("임시파일삭제 성공");
				}else{
					System.out.println("임시파일삭제 실패");
				}
			}else{
				System.out.println("임시파일이 존재하지 않습니다.");
			}


		} catch (Exception e) {
			e.printStackTrace();
		}// catch
	}
	
	public String getResult() {
		return result;
	}

}
