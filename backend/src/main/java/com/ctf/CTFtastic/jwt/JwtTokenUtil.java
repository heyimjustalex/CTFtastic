package com.ctf.CTFtastic.jwt;

import com.ctf.CTFtastic.model.userr;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Clock;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.DefaultClock;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtTokenUtil implements Serializable {
    private String secret = "sururlskjadkdsadsa23rd32";
    private Clock clock = DefaultClock.INSTANCE;
    @Value("${jwt.token.duration.in.seconds}")
    private Long tokenDuration;

    private String doGenerateToken(Map<String, Object> claims, String subject) {
        final Date createdDate = clock.now();
        final Date expirationDate = calculateExpirationDate(createdDate);
        return
                Jwts.builder()
                        .setClaims(claims)
                        .setSubject(subject)
                        .setIssuedAt(createdDate)
                        .setExpiration(expirationDate)
                        .signWith(SignatureAlgorithm.HS256, secret).compact();
    }

    public String refreshToken(String token) {
        final Date createdDate = clock.now();
        final Date expirationDate = calculateExpirationDate(createdDate);

        final Claims claims = getAllClaimsFromToken(token);
        claims.setIssuedAt(createdDate);
        claims.setExpiration(expirationDate);
        return Jwts.builder()
                .setClaims(claims)
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();
    }

    public String generateToken(String username) {
        Map<String, Object> claims = new HashMap<>();
        return doGenerateToken(claims, username);
    }
    private Date calculateExpirationDate(Date createdDate) {
        return new Date(createdDate.getTime() + tokenDuration * 1000);
    }

    public String getUsernameFromToken(String jwtToken) {
        return getClaimFromtoken(jwtToken, Claims::getSubject);
    }

    public boolean validateToken(String jwtToken, UserDetails userDetails) {
        User userDetails1 = (User) userDetails;
        final String username = getUsernameFromToken(jwtToken);
        return (username.equals(userDetails1.getUsername()) && !isTokenExpired(jwtToken));
    }

    public Date getExpirationDateFromToken(String token) {
        return getClaimFromtoken(token, Claims::getExpiration);
    }

    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
    }

    public <T> T getClaimFromtoken(String token, Function<Claims, T> claimsresolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsresolver.apply(claims);
    }

    private boolean isTokenExpired(String jwtToken) {
        final Date expiration = getExpirationDateFromToken(jwtToken);
        return expiration.before(clock.now());
    }
}
