heroku logs --num 1500 | egrep "New user started|Username|calculated" | cut -d ' '  -f 3- > logs
cat logs | awk -F 'ID:' '{print $2}' | sort -u -k1,2 > users
cat users