import os
import re
from datetime import datetime #날짜와 시간 관련 기능
import sys #시스템 작업 수행하는 기능

user_list = []

ad_name = "admin"
ad_ps = "admin123"
check = 'member' #로그인된 사람이 관리자인지 회원인지 구별하는 변수
#================================================회원가입,로그인
def mail(email): #메일 형식 검사 함수 -정민섭
    email_regex = re.compile(r"[^@]+@[^@]+\.[^@]+")
    return email_regex.match(email)

def ps(password): #비밀번호 형식 검사 함수 -정민섭
    return any(char.isupper() for char in password)

def sign(): #회원가입 함수 -정민섭
    print("회원 가입을 시작합니다.")
    
    while True:
        email = input("이메일 주소를 입력하세요: ")
        if mail(email):
            break
        else:
            print("올바른 이메일 주소 형식이 아닙니다. 다시 입력하세요.")

    while True:
        username = input("아이디를 입력하세요: ")
        if username not in [user['아이디'] for user in user_list]:
            break
        else:
            print("이미 존재하는 아이디입니다. 다시 입력하세요.")

    while True:
        password = input("비밀번호를 입력하세요 (대문자를 포함해야 합니다): ")
        if ps(password):
            break
        else:
            print("비밀번호는 대문자를 포함해야 합니다. 다시 입력하세요.")

    user_info = {'이메일': email, '아이디': username, '비밀번호': password}
    
    user_list.append(user_info)
    
    print("회원 가입이 완료되었습니다.")

def login(): #로그인 기능 함수 -정민섭
    global  check 
    user_type = input("로그인할 사용자 유형을 선택하세요 (관리자: 1, 회원: 2): ")

    if user_type == '1':
        ad_name_input = input("관리자 아이디를 입력하세요: ")
        ad_ps_input = input("관리자 비밀번호를 입력하세요: ")

        if login_admin(ad_name_input, ad_ps_input):
            print("관리자로 로그인되었습니다.\n")
            check = 'admin'
            manager_mode()
        else:
            print("잘못된 관리자 아이디 또는 비밀번호입니다.")
    elif user_type == '2':
        username_input = input("아이디를 입력하세요: ")
        password_input = input("비밀번호를 입력하세요: ")

        if login_user(username_input, password_input):
            print("회원으로 로그인되었습니다.\n")
            check = 'member'
            member_mode()
        else:
            print("잘못된 아이디 또는 비밀번호입니다.")
    else:
        print("올바른 사용자 유형을 선택하세요.")

def login_user(username_input, password_input): #유저 로그인 함수 -정민섭
    for user in user_list:
        if user['아이디'] == username_input and user['비밀번호'] == password_input:
            return True
    return False

def login_admin(username_input, password_input): #관리자 로그인 함수 -정민섭
    return username_input == ad_name and password_input == ad_ps

#==========================================================로그인 후 화면
def member_mode() : #회원 전용 메인화면 - 박지민
    while True :
        print(" 1. 게시물 보기 \n 2. 게시물 작성 \n 3. 댓글 작성 \n 4. 로그아웃\n")
        ch1 = int(input("\n원하는 작업을 선택하세요: "))
        if ch1 ==1:
            view()
        elif ch1 == 2:
            write()
        elif ch1 == 3:
            add_comment()
        elif ch1 == 4:
            main()

def manager_mode(): #관리자 전용 메인화면 - 박지민
    while True :
        print("1.회원 관리\n2. 게시판\n3. 로그아웃")
        choice = input("\n원하는 작업을 선택하세요: ")
        
        if choice == '1':
            member_management(user_list)
        elif choice == '2':
            manager_board()
        elif choice == '3':
            print("로그아웃 되었습니다.\n")
            main()
        else:
            print("올바른 옵션을 입력하세요.")


def member_management(user_list) : #회원 관리 기능(회원 리스트 출력 포함) - 박지민
    while True :
        print("\n1.회원 리스트 \n2.회원 차단 \n3.종료")
        choice = input("원하는 작업을 선택하세요: ")
        if choice == '1':
                for i in user_list :
                    print(i)
        elif choice == '2':
            member_delete(user_list)
        elif choice == '3':
            break
        else:
            print("올바른 옵션을 입력하세요.")

def member_delete(user_list) : #회원 차단(삭제) 기능 -박지민
    delete = input("\n차단할 회원의 아이디를 입력하세요.")
    delete_index = 0 #삭제할 회원정보가 있는 인덱스
    for i in user_list :
        if delete in i.values() :
            del user_list[delete_index]
            print("삭제성공")
            print("남은 회원 리스트\n", user_list)
        else :
            delete_index += 1


def manager_board() :#관리자의 게시판 작업 함수 -박지민
    while True :
        print("\n 1. 게시물 보기 \n 2. 게시물 작성 \n 3. 게시물 삭제 \n 4. 게시물 고정 \n 5. 카테고리 생성 \n 6. 답변 작성 \n 0.종료")
        ch1=int(input("\n원하는 작업을 선택하세요: "))
        if ch1 ==1 :
            view()                   
        elif ch1 == 2:
            write()           
        elif ch1 == 3:
            delete()
                
        elif ch1 == 4:
            fixfile()

        elif ch1 == 5:
            create_category()
                
        elif ch1 == 6:
            add_comment()
                
        elif ch1 == 0:
            manager_mode()

def board(): #카테고리 선택 -이서연
    os.chdir('C:/Users/User/Desktop/게시판/게시판/카테고리') #본인 경로에 맞게 수정
    f=os.listdir()
    print("================")
    for i in f:
            print(i,"\t",end="")
    print("\n================\n \n")
    cho = input("카테고리 선택(뒤로가기(b)):")
    if cho == "b":
        if check == 'admin' :
            manager_board()
        elif check == 'member' :
            member_mode()   
    else:
        os.chdir(f[(int(cho)-1)])
        c=cate()


def cate(): #카테고리 확정 함수 -이서연
    f=os.listdir()
    print("\n=====[main]=====\n")
    try:
        for s in range(0,10):
            print(f[s])
    except IndexError:
            print("================\n")      
    print("\n","[총 페이지 수]")
    for k in range(0,(len(f)//10)+1):
        print(k+1,"     ", end="")
    print("\n")      

    while(1):
        num = input("페이지 입력(뒤로가기(b)):")
        print("\n")
        if num == "b":
            board()
        else:
            try:
                for j in range((int(num)-1)*10,((int(num)-1)*10)+10,1):
                    print(f[j])
                print("\n================\n")
            except IndexError:
                print("\n================\n")
            c=input("페이지 확정(c):")
            if c=='c':
                break
            else:
                continue

def view(): #게시글 보기 함수 -이서연
    board()
    while (1):
        f=os.listdir()
        while True:
            try:
                answer=input("파일명 입력(뒤로 가기(b)):")          
                f=open(f'{answer}.txt' ,'r')
                text=f.readlines()                      
                for i in text:
                    print(i)
                f.close()

                while (1):
                    re=input("계속 입력하시겠습니까?(y/n) ")
                    if re == "y":
                        break
                    if re == "n":
                        board()
                        break
                    else:
                        print("잘못 입력하셨습니다. 다시 입력해주세요")
                        continue
                    continue
            except FileNotFoundError:
                if answer == 'b' :
                    board()
                else :
                    print("잘못 입력하셨습니다. 다시 입력해주세요")
                    continue
                
now = datetime.now()              
def write(): #게시글 작성 함수 -이서연
    board()
    while(1):
            n=input("게시글 제목 : ")
            f=open(n+'.txt',"w")
            nn=input("게시글 내용 : ")

            f.write("["+str(now.month) + "/" + str(now.day)+"]\n\n"+ n +"\n"+nn)  #로그인 된 사람의 이름의 번을 여기에 추가
            f.close()
            print("=====[입력되었습니다]=====\n")
            while(1):
                answer=input("계속 작성하시겠습니까?y/n) ")
                if answer == "y":
                        break
                if answer == "n":
                    board()
                    break
                else:
                    print("잘못 입력하셨습니다.")
                    continue
                continue

def delete(): #게시글 삭제 함수 -이서연
    board()
    while(1):
        try:
            n=input("삭제할 게시글 제목 입력 : ")
            if os.path.isfile(n + '.txt'):
                    os.remove(n + '.txt')
                    print("=====[삭제되었습니다]=====\n")
        except FileNotFoundError:
                print("잘못 입력하셨습니다. 다시 입력해주세요")
                continue 
        while (1):
            answer=input("계속해서 삭제를 하시겠습니까?y/n) ")
            if answer == "y":
                    break
            if answer == "n":
                board()
                break
            else:
                print("잘못 입력하셨습니다. 다시 입력해주세요:")
                continue
            continue

def fixfile() : #게시글 고정 함수 -박지민
    board()
    file_name = input("고정할 게시물 제목을 입력하세요: ")
    if file_name + ".txt" in os.listdir() :
        new_name = f'고정) {file_name}.txt'
        infile = open(file_name + '.txt', "rb")
        outfile = open(new_name, "wb")
    
        while True :
            copy_buffer = infile.read(1024)
            if not copy_buffer :
                break
            outfile.write(copy_buffer)
        infile.close()
        outfile.close()
        print("게시물이 고정되었습니다.")

    else :
        print("일치하는 게시물이 없습니다.")

def create_category () :
    while True : #카테고리만들기_(관리자전용) -황승민
        category_plus = input('카테고리 이름을 적어주세요(종료 : 0) : ')
        try :
            if category_plus != '0' :
                #카테고리 추가(경로는 본인 카테고리 위치로 변경)
                os.makedirs(f'C:/Users/User/Desktop/게시판/게시판/카테고리/{category_plus}')
            else :
                break
        except FileExistsError : #이미 존재하는 카테고리 일시
            print('이미 존재하는 파일명입니다. 다시 입력해 주세요')

def add_comment() : #댓글작성_(관리자,회원) -황승민
    board()
    file_name = input('게시물을 선택하세요: ')
    f=open(f'{file_name}.txt' ,'r')
    text=f.readlines()                      
    for i in text:
        print(i)
    if check == 'member' :
        username = input('닉네임 입력 : ')
        comment = input('댓글 입력 : ')
        file = open(f'{file_name}.txt', 'a')
        file.write(f'\n[{username}]-{comment}\n')
    elif check == 'admin' :
        file = open(f'{file_name}.txt', 'a')
        comment = input('댓글 입력 : ')
        file.write('\n[관리자]-' + comment +'\n')
    print("작성이 완료되었습니다.")
    file.close() #파일 닫기

def mkdir() : #게시판 폴더가 없으면 생성(경로를 찾지 못 할 경우를 방지) -박지민
    if not os.path.exists('게시판') :
        os.makedirs('게시판/카테고리/category')
    os.chdir('게시판')
            
def main(): #메인화면 -박지민
    while True:
        print("\n1. 회원 가입\n2. 로그인\n0. 종료")
        choice = input("원하는 작업을 선택하세요: ")
        
        if choice == '1':
            sign()
        elif choice == '2':
            login()
        elif choice == '0':
            print("프로그램을 종료합니다.")
            sys.exit() #프로그램 자체를 종료시킴
        else:
            print("올바른 선택을 입력하세요.")
#=========================================================실행

mkdir()
main()





