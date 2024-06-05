FROM openjdk:17-oracle



WORKDIR /root
run mkdir -p saveFolder

WORKDIR /app

COPY build/libs/*.jar app.jar
COPY cert_and_key.p12 /app/cert_and_key.p12


ENTRYPOINT ["java","-jar","app.jar"]
