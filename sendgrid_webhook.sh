function localtunnel {
  lt -s jfkdla325jjklj&*\#j2kl --port 5000
}
until localtunnel; do
echo "localtunnel server crashed"
sleep 2
done
