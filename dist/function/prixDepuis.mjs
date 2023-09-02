"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function prixDepuis(jour) {
    return __awaiter(this, void 0, void 0, function* () {
        const nbJour = jour;
        const today = new Date();
        const dayOfWeek = today.getDay();
        switch (dayOfWeek) {
            //Dimanche
            case 0:
                return [-2, -3];
            //lundi
            case 1:
                return [-3, -4];
            //Mardi
            case 2:
                return [-1, -4];
        }
        console.log(dayOfWeek);
    });
}
prixDepuis(2);
