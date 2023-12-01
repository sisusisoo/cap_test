FROM openjdk:17-oracle



WORKDIR /root
run mkdir -p saveFolder

WORKDIR /app

COPY build/libs/*.jar app.jar


ENTRYPOINT ["java","-jar","app.jar"]