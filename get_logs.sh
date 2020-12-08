scp -i ./Key_Pair_Bot.pem ec2-user@ec2-54-200-250-221.us-west-2.compute.amazonaws.com:Bread_Calc/users.log ./
sed 's/ \+/,/g' ./users.log > ./users.csv
python3 ./to_csv.py