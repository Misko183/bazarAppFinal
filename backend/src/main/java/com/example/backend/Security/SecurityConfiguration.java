/*
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(10);
*/

package com.example.backend.Security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {


    @Autowired
    UserDetailsServiceImpl userDetailsService;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService);
      }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors().and()
                .csrf().disable()
                .authorizeRequests()
                .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
//                .antMatchers(HttpMethod.GET, "/**").permitAll()
//                .antMatchers(HttpMethod.POST, "/**").permitAll()
                .antMatchers(HttpMethod.GET, "/favourite").hasAnyAuthority("USER", "ADMIN")
                .antMatchers(HttpMethod.POST, "/favourite").hasAnyAuthority("USER", "ADMIN")
                .antMatchers(HttpMethod.POST, "/removefavourite").hasAnyAuthority("USER", "ADMIN")
                .antMatchers(HttpMethod.GET, "/feedback").hasAnyAuthority("ADMIN")
                .antMatchers(HttpMethod.POST, "/feedback").hasAnyAuthority("USER")
                .antMatchers(HttpMethod.POST, "/deletefeedback").hasAnyAuthority("ADMIN")
                .antMatchers(HttpMethod.GET, "/user").permitAll()
                .antMatchers(HttpMethod.GET, "/users").hasAnyAuthority("ADMIN")
                .antMatchers(HttpMethod.GET, "/usermessege").permitAll()
                .antMatchers(HttpMethod.POST, "/role").permitAll()
                .antMatchers(HttpMethod.GET, "/role").permitAll()
                .antMatchers(HttpMethod.POST, "/createUser").permitAll()
                .antMatchers(HttpMethod.POST, "/deleteuser").hasAnyAuthority("ADMIN")
                .antMatchers(HttpMethod.POST, "/edituser").hasAnyAuthority("USER", "ADMIN")
                .antMatchers(HttpMethod.GET, "/advertisement").permitAll()
                .antMatchers(HttpMethod.POST, "/advertisement").hasAnyAuthority("USER", "ADMIN")
                .antMatchers(HttpMethod.POST, "/deleteproduct").hasAnyAuthority("USER","ADMIN")
                .antMatchers(HttpMethod.POST, "/editproduct").hasAnyAuthority("USER", "ADMIN")
                .antMatchers(HttpMethod.GET, "/myproducts").hasAnyAuthority("USER", "ADMIN")
                .antMatchers(HttpMethod.POST, "/category").permitAll()
                .antMatchers(HttpMethod.GET, "/advertisement/category").permitAll()
                .antMatchers(HttpMethod.POST, "/updateproduct").permitAll()
                .antMatchers(HttpMethod.POST, "/upload/image").hasAnyAuthority("USER", "ADMIN")
                .antMatchers(HttpMethod.POST, "/changeImage").hasAnyAuthority("USER", "ADMIN")
                .antMatchers(HttpMethod.GET, "/get/image/info/{id}").permitAll()
                .antMatchers(HttpMethod.GET, "/get/image/{id}").permitAll()
                .antMatchers(HttpMethod.GET, "/getallimages").permitAll()
                .antMatchers(HttpMethod.GET, "/getcategoryimages").permitAll()
                .antMatchers(HttpMethod.GET, "/getusersproductimages").hasAnyAuthority("USER", "ADMIN")
                .antMatchers(HttpMethod.GET, "/getfavouriteimages").hasAnyAuthority("USER", "ADMIN")
                .anyRequest().authenticated()
                .and()
                .httpBasic();
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {

            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:4200")
                        .allowedMethods("*")
                        .allowCredentials(true);
            }

        };
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return NoOpPasswordEncoder.getInstance();
    }

}
